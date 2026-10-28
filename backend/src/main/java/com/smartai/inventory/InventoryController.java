package com.smartai.inventory;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;

@RestController @RequestMapping("/api") @CrossOrigin(origins={
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://smartai-inventory-management-system.vercel.app"
})
public class InventoryController {
 private final ProductRepository products; private final SupplierRepository suppliers; private final CustomerRepository customers; private final SaleRepository sales; private final PurchaseRepository purchases; private final ReminderPreferenceRepository reminders;
 public InventoryController(ProductRepository p,SupplierRepository s,CustomerRepository c,SaleRepository sa,PurchaseRepository pu,ReminderPreferenceRepository r){products=p;suppliers=s;customers=c;sales=sa;purchases=pu;reminders=r;}
 @GetMapping("/health") public Map<String,String> health(){return Map.of("status","UP","application","SmartAI Inventory API");}
 @GetMapping("/products") public List<Product> allProducts(){return products.findAll();}
 @PostMapping("/products") public Product createProduct(@Valid @RequestBody Product p){return products.save(p);}
 @PutMapping("/products/{id}") public Product updateProduct(@PathVariable String id,@Valid @RequestBody Product p){Product old=products.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Product not found")); old.setName(p.getName());old.setSku(p.getSku());old.setCategory(p.getCategory());old.setPrice(p.getPrice());old.setStock(p.getStock());old.setReorder(p.getReorder());old.setSupplier(p.getSupplier());return products.save(old);}
 @DeleteMapping("/products/{id}") public Map<String,String> deleteProduct(@PathVariable String id){if(!products.existsById(id))throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Product not found");products.deleteById(id);return Map.of("message","deleted");}
 @GetMapping("/suppliers") public List<Supplier> allSuppliers(){return suppliers.findAll();}
 @PostMapping("/suppliers") public Supplier createSupplier(@RequestBody Supplier s){if(s.getName()==null||s.getName().isBlank())throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Supplier name is required");if(s.getProducts()==null)s.setProducts(0);s.setStatus("Active");return suppliers.save(s);}
 @GetMapping("/customers") public List<Customer> allCustomers(){return customers.findAll();}
 @GetMapping("/sales") public List<Sale> allSales(){return sales.findAllByOrderByDateDesc();}
 @PostMapping("/sales") @Transactional public Sale createSale(@RequestBody Map<String,Object> body){String productId=String.valueOf(body.get("productId"));Product p=products.findById(productId).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Product not found"));int qty=number(body.get("quantity"));if(qty<1)throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Quantity must be at least 1");if(p.getStock()<qty)throw new ResponseStatusException(HttpStatus.CONFLICT,"Insufficient stock");p.setStock(p.getStock()-qty);products.save(p);Sale s=new Sale();s.setProductId(p.getId());s.setProductName(p.getName());s.setCustomer(String.valueOf(body.getOrDefault("customer","Walk-in Customer")));s.setItems(qty);s.setAmount(body.get("amount")==null?p.getPrice()*qty:Double.valueOf(String.valueOf(body.get("amount"))));s.setStatus("Completed");sales.save(s);s.setStockAfter(p.getStock());updateCustomer(s.getCustomer(),s.getAmount());return s;}
 @GetMapping("/purchases") public List<Purchase> allPurchases(){return purchases.findAllByOrderByDateDesc();}
 @PostMapping("/purchases") @Transactional public Purchase createPurchase(@RequestBody Map<String,Object> body){String productId=String.valueOf(body.get("productId"));Product p=products.findById(productId).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Product not found"));int qty=number(body.get("quantity"));if(qty<1)throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Quantity must be at least 1");p.setStock(p.getStock()+qty);products.save(p);Purchase x=new Purchase();x.setProductId(p.getId());x.setProductName(p.getName());x.setSupplier(String.valueOf(body.getOrDefault("supplier",p.getSupplier()==null?"Supplier":p.getSupplier())));x.setItems(qty);x.setAmount(body.get("amount")==null?p.getPrice()*qty:Double.valueOf(String.valueOf(body.get("amount"))));x.setStatus("Received");purchases.save(x);x.setStockAfter(p.getStock());return x;}
 @GetMapping("/reminders") public ReminderPreference getReminders(@RequestParam String email){return reminders.findById(email).orElseGet(()->{ReminderPreference r=new ReminderPreference();r.setEmail(email);return r;});}
 @PostMapping("/reminders") public ReminderPreference saveReminders(@RequestBody ReminderPreference r){if(r.getEmail()==null||r.getEmail().isBlank())throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Email is required");return reminders.save(r);}
 @GetMapping("/notifications") public List<Map<String,Object>> notifications(@RequestParam(required=false) String email){List<Map<String,Object>> out=new ArrayList<>();for(Product p:products.findAll()){if(p.getStock()<=p.getReorder()){Map<String,Object> n=new LinkedHashMap<>();n.put("type","LOW_STOCK");n.put("productId",p.getId());n.put("product",p.getName());n.put("stock",p.getStock());n.put("message",p.getName()+" is running low ("+p.getStock()+" left)");out.add(n);}}return out;}
 private int number(Object o){try{return Integer.parseInt(String.valueOf(o));}catch(Exception e){throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Valid quantity is required");}}
 private void updateCustomer(String name,double amount){if(name==null||name.isBlank()||name.equalsIgnoreCase("Walk-in Customer"))return;Customer c=customers.findAll().stream().filter(x->name.equalsIgnoreCase(x.getName())).findFirst().orElseGet(Customer::new);c.setName(name);c.setOrders((c.getOrders()==null?0:c.getOrders())+1);c.setSpent((c.getSpent()==null?0:c.getSpent())+amount);if(c.getType()==null)c.setType("Individual");customers.save(c);}
}
