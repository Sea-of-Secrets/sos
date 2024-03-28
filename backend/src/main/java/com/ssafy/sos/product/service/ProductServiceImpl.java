package com.ssafy.sos.product.service;

import com.ssafy.sos.global.S3.S3Service;
import com.ssafy.sos.global.error.CustomException;
import com.ssafy.sos.global.error.ExceptionEnum;
import com.ssafy.sos.nft.service.NFTService;
import com.ssafy.sos.product.domain.Product;
import com.ssafy.sos.product.domain.Purchase;
import com.ssafy.sos.product.domain.PurchaseId;
import com.ssafy.sos.product.dto.ProductDTO;
import com.ssafy.sos.product.mapper.ProductMapper;
import com.ssafy.sos.product.repository.ProductRepository;
import com.ssafy.sos.product.repository.PurchaseRepository;
import com.ssafy.sos.user.domain.CustomOAuth2User;
import com.ssafy.sos.user.domain.UserEntity;
import com.ssafy.sos.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.security.SecureRandom;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final UserRepository userRepository;

    private final ProductRepository productRepository;

    private final PurchaseRepository purchaseRepository;

    private final S3Service s3Service;

    private final ProductMapper productMapper;

    private final NFTService nftService;

    @Transactional(readOnly = true)
    @Override
    public List<ProductDTO.Response> getAllProducts() {

        List<Product> productList = productRepository.findByIsDeletedFalse();

        return productMapper.entityToDtoForList(productList);
    }

    @Override
    public ProductDTO.Response randomProduct(CustomOAuth2User userDTO) {

        UserEntity userEntity = userRepository.findByUsername(userDTO.getUsername());
        int userGold = userEntity.getGold();

        if(userGold < 150) {
            throw new CustomException(ExceptionEnum.NOT_ENOUGH_GOLD);
        }

        userEntity.setGold(userGold - 150);

        SecureRandom secureRandom = new SecureRandom();
        int num = secureRandom.nextInt(100) + 1;

        if (num == 1) {
            List<Product> uniqueProductList = productRepository.findByIsUniqueTrueAndIsDeletedFalseAndIsSoldOutFalse();

            if (!uniqueProductList.isEmpty()) {
                int index = secureRandom.nextInt(uniqueProductList.size());
                Product selectedUniqueProduct = uniqueProductList.get(index);

                PurchaseId purchaseId = PurchaseId.builder()
                        .userId(userEntity.getId())
                        .productId(selectedUniqueProduct.getId())
                        .build();

                purchaseRepository.save(Purchase.builder()
                        .id(purchaseId)
                        .productId(selectedUniqueProduct)
                        .userId(userEntity)
                        .build());

                try {
                    nftService.mintingNFT(userEntity, selectedUniqueProduct);

                    selectedUniqueProduct.soldOut();

                    return productMapper.entityToDto(selectedUniqueProduct);
                } catch(Exception e) {
                    throw new CustomException(ExceptionEnum.NFT_MINTING_ERROR);
                }
            }
        }

        List<Product> commonProductList = productRepository.findByIsUniqueFalseAndIsDeletedFalseAndIsSoldOutFalse();
        int index = secureRandom.nextInt(commonProductList.size());
        Product selectedCommonProduct = commonProductList.get(index);

        PurchaseId purchaseId = PurchaseId.builder()
                .userId(userEntity.getId())
                .productId(selectedCommonProduct.getId())
                .build();

        Optional<Purchase> purchase = purchaseRepository.findById(purchaseId);

        if(purchase.isEmpty()) {
            purchaseRepository.save(Purchase.builder()
                    .id(purchaseId)
                    .productId(selectedCommonProduct)
                    .userId(userEntity)
                    .build());
        }

        return productMapper.entityToDto(selectedCommonProduct);
    }

    @Override
    public void registerProduct(ProductDTO.Post productDTO, MultipartFile imageFile) {

        String imageName = s3Service.saveUploadFile(imageFile);
        String imageUrl = s3Service.getFilePath(imageName);

        productRepository.save(Product.builder()
                .name(productDTO.name())
                .description(productDTO.description())
                .imageName(imageName)
                .imageUrl(imageUrl)
                .isUnique(productDTO.isUnique())
                .build());
    }
}
