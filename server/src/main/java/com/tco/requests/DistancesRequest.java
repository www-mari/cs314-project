package com.tco.requests;

import java.util.ArrayList;
import java.util.HashMap;
import java.math.BigInteger;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DistancesRequest extends RequestHeader {

    private final transient Logger log = LoggerFactory.getLogger(DistancesRequest.class);

    private double earthRadius;
    private ArrayList<HashMap<String, String>> places;

    private ArrayList<Number> distances = new ArrayList<>();

    @Override
    public void buildResponse() {
      distances = new ArrayList<>();
      if(places.size() > 1){        
        for(int i = 0; i < places.size()-1; i++){
          distances.add(calculateDistance(places.get(i), places.get(i+1)));
        }
        distances.add(calculateDistance(places.get(places.size()-1), places.get(0)));
      }
      if(places.size() == 1){
        distances.add(0);
      }
    }

    public Number calculateDistance(HashMap<String, String> place1, HashMap<String, String> place2) {
      Float place1_x = Float.parseFloat(place1.get("latitude"));
      Float place1_y = Float.parseFloat(place1.get("longitude"));
      Float place2_x = Float.parseFloat(place2.get("latitude"));
      Float place2_y = Float.parseFloat(place2.get("longitude"));
      
      // Credit Lindsey's math brain
      double centralAngle = Math.acos((Math.sin(Math.toRadians(place1_x)) *
                            Math.sin(Math.toRadians(place2_x))) + (Math.cos(Math.toRadians(place1_x)) * Math.cos(Math.toRadians(place2_x)) *
                            Math.cos(Math.abs(Math.toRadians(place1_y) - Math.toRadians(place2_y)))));

      double distance = earthRadius * centralAngle;

      return Long.valueOf(Math.round(distance));
    }


  /* The following methods exist only for testing purposes and are not used
  during normal execution, including the constructor. */

    public DistancesRequest(double radius, ArrayList<HashMap<String, String>> places) {
      this.requestType = "distances";
      this.earthRadius = radius;
      this.places = places;
    }

    public DistancesRequest(double radius) {
      this.requestType = "distances";
      this.earthRadius = radius;
    }

    public String getRequestType() {
      return this.requestType;
    }

    public ArrayList<Number> getDistances() {
      return this.distances;
    }
}