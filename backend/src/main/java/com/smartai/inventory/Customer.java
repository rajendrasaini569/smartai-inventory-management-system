package com.smartai.inventory;
import jakarta.persistence.*;
@Entity @Table(name="customers")
public class Customer {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id; private String name; private String email; private Integer orders=0; private Double spent=0.0; private String type="Individual";
 public Customer(){} public Long getId(){return id;} public String getName(){return name;} public void setName(String v){name=v;} public String getEmail(){return email;} public void setEmail(String v){email=v;} public Integer getOrders(){return orders;} public void setOrders(Integer v){orders=v;} public Double getSpent(){return spent;} public void setSpent(Double v){spent=v;} public String getType(){return type;} public void setType(String v){type=v;}
}
