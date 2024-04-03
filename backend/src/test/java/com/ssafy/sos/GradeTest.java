package com.ssafy.sos;

import com.ssafy.sos.global.error.CustomException;
import com.ssafy.sos.global.error.ExceptionEnum;
import com.ssafy.sos.product.domain.Grade;
import com.ssafy.sos.product.domain.Product;
import com.ssafy.sos.product.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class GradeTest {

    @Autowired
    private ProductRepository productRepository;

    @Test
    public void test1() {
        List<Product> list = productRepository.findByGradeAndIsDeletedFalseAndIsSoldOutFalse(Grade.RARE);

        System.out.println(list.size());
    }
}
