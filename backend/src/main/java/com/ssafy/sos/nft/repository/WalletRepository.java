package com.ssafy.sos.nft.repository;

import com.ssafy.sos.nft.domain.Wallet;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WalletRepository extends CrudRepository<Wallet, String> {
    Wallet findByAddress(String address);
}
