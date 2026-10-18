package com.smartai.inventory;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.util.UUID;

@Entity @Table(name="products")
public class Product {
  @Id private String id;
  @NotBlank @Column(nullable=false) private String name;
  @NotBlank @Column(nullable=false, unique=true) private String sku;
  @NotBlank @Column(nullable=false) private String category;
  @NotNull @PositiveOrZero private Double price;
  @NotNull @PositiveOrZero private Integer stock;
  @NotNull @PositiveOrZero private Integer reorder;
  private String supplier;
  public Product() {}
  @PrePersist public void assignId() { if (id == null || id.isBlank()) id = "PRD-" + UUID.randomUUID().toString().substring(0,8).toUpperCase(); }
  public String getId(){return id;} public void setId(String v){id=v;}
  public String getName(){return name;} public void setName(String v){name=v;}
  public String getSku(){return sku;} public void setSku(String v){sku=v;}
  public String getCategory(){return category;} public void setCategory(String v){category=v;}
  public Double getPrice(){return price;} public void setPrice(Double v){price=v;}
  public Integer getStock(){return stock;} public void setStock(Integer v){stock=v;}
  public Integer getReorder(){return reorder;} public void setReorder(Integer v){reorder=v;}
  public String getSupplier(){return supplier;} public void setSupplier(String v){supplier=v;}
}
