package com.smartai.inventory;
import jakarta.persistence.*; import java.time.LocalDate; import java.util.UUID;
@Entity @Table(name="purchases")
public class Purchase {
 @Id private String id; private String supplier; private String productId; private String productName; private LocalDate date; private Integer items; private Double amount; private String status="Received"; @Transient private Integer stockAfter;
 public Purchase(){} @PrePersist public void assign(){if(id==null)id="PUR-"+UUID.randomUUID().toString().substring(0,8).toUpperCase();if(date==null)date=LocalDate.now();}
 public String getId(){return id;} public void setId(String v){id=v;} public String getSupplier(){return supplier;} public void setSupplier(String v){supplier=v;} public String getProductId(){return productId;} public void setProductId(String v){productId=v;} public String getProductName(){return productName;} public void setProductName(String v){productName=v;} public LocalDate getDate(){return date;} public void setDate(LocalDate v){date=v;} public Integer getItems(){return items;} public void setItems(Integer v){items=v;} public Double getAmount(){return amount;} public void setAmount(Double v){amount=v;} public String getStatus(){return status;} public void setStatus(String v){status=v;} public Integer getStockAfter(){return stockAfter;} public void setStockAfter(Integer v){stockAfter=v;}
}
