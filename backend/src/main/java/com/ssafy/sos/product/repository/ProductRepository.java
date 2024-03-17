package com.ssafy.sos.product.repository;

import com.ssafy.sos.product.domain.Product;
import com.ssafy.sos.product.domain.ProductDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("""
            SELECT new com.ssafy.sos.product.domain.ProductDTO(
                pd.id, pd.user.id, pd.nftId, pd.title, pd.description, pd.imageUrl, pd.price, pd.isSoldOut
            )
            FROM Product pd
            """)
    List<ProductDTO> findAllProducts();
}
