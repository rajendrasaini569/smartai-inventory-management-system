package com.smartai.inventory;
import jakarta.persistence.*;
@Entity @Table(name="reminder_preferences")
public class ReminderPreference {
 @Id private String email; private boolean daily; private boolean weekly=true; private boolean monthly; private boolean lowStock=true; private boolean offers=true;
 public ReminderPreference(){} public String getEmail(){return email;} public void setEmail(String v){email=v;} public boolean isDaily(){return daily;} public void setDaily(boolean v){daily=v;} public boolean isWeekly(){return weekly;} public void setWeekly(boolean v){weekly=v;} public boolean isMonthly(){return monthly;} public void setMonthly(boolean v){monthly=v;} public boolean isLowStock(){return lowStock;} public void setLowStock(boolean v){lowStock=v;} public boolean isOffers(){return offers;} public void setOffers(boolean v){offers=v;}
}
