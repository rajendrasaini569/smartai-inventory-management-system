package com.smartai.inventory;
import jakarta.persistence.*;
@Entity @Table(name="suppliers")
public class Supplier {
 @Id private String name; private String contact; private String email; private Integer products; private String status="Active";
 public Supplier(){} public String getName(){return name;} public void setName(String v){name=v;} public String getContact(){return contact;} public void setContact(String v){contact=v;} public String getEmail(){return email;} public void setEmail(String v){email=v;} public Integer getProducts(){return products;} public void setProducts(Integer v){products=v;} public String getStatus(){return status;} public void setStatus(String v){status=v;}
}
