package com.smartai.inventory;
import org.springframework.data.jpa.repository.JpaRepository; import java.util.List;
public interface PurchaseRepository extends JpaRepository<Purchase,String> { List<Purchase> findAllByOrderByDateDesc(); }
