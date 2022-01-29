package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.HashMap;

public class TestTourRequest {

    private TourRequest conf;

    private ArrayList<HashMap<String, String>> places = new ArrayList<>();
    private double earthRadius = 6371.0;
    private Number response = 1;
    @BeforeEach
    public void createConfigurationForTestCases() {
        conf = new TourRequest(earthRadius, response, places);
        conf.buildResponse();
    }

    @Test
    @DisplayName("Request type is \"tour\"")
    public void testType() {
        String type = conf.getRequestType();
        assertEquals("tour", type);
    }

    @Test
    @DisplayName("Request time is \"1\"")
    public void testResponse() {
        Number time = conf.getResponseTime();
        assertEquals(1, time);
    }
    
    @Test
    @DisplayName("Places are returned")
    public void testPlaces() {
        HashMap<String, String> place = new HashMap<>();
        // Place 1
        place.put("latitude", "32.939601");
        place.put("longitude", "-90.837303");
        places.add(place);

        place = new HashMap<>();
        // Place 2
        place.put("latitude", "48.455001");
        place.put("longitude", "-103.879997");
        places.add(place);

        conf = new TourRequest(earthRadius, response, places);
        conf.buildResponse();

        ArrayList<HashMap<String, String>> tour = conf.getPlaces();

        assert(tour.size() > 0);
    }

    @Test
    @DisplayName("Four places are optimized and reordered")
    public void testSimpleOptimization() {
        HashMap<String, String> place1 = new HashMap<>();
        place1.put("name", "Denver");
        place1.put("latitude", "39.7");
        place1.put("longitude", "-105.0");
        places.add(place1);

        HashMap<String, String> place2= new HashMap<>();
        place2.put("name", "Miami");
        place2.put("latitude", "25.7");
        place2.put("longitude", "-80.2");
        places.add(place2);        

        HashMap<String, String> place3= new HashMap<>();
        place3.put("name", "Boulder");
        place3.put("latitude", "40.0");
        place3.put("longitude", "-105.4");
        places.add(place3);

        HashMap<String, String> place4 = new HashMap<>();
        place4.put("name", "Fort Collins");
        place4.put("latitude", "40.6");
        place4.put("longitude", "-105.1");
        places.add(place4);

        conf = new TourRequest(earthRadius, response, places);
        conf.buildResponse();
        ArrayList<HashMap<String, String>> tour = conf.getPlaces();

        ArrayList<HashMap<String, String>> expectedTour = new ArrayList<>();
        expectedTour.add(place1);
        expectedTour.add(place2);
        expectedTour.add(place4);
        expectedTour.add(place3);
        assertEquals(expectedTour, tour);
    }

    @Test
    @DisplayName("Four places are optimized and already in the correct order")
    public void testAlreadyOptimized() {
        HashMap<String, String> place1 = new HashMap<>();
        place1.put("name", "Denver");
        place1.put("latitude", "39.7");
        place1.put("longitude", "-105.0");
        places.add(place1);

        HashMap<String, String> place2 = new HashMap<>();
        place2.put("name", "Fort Collins");
        place2.put("latitude", "40.6");
        place2.put("longitude", "-105.1");
        places.add(place2);

        HashMap<String, String> place3= new HashMap<>();
        place3.put("name", "Miami");
        place3.put("latitude", "25.7");
        place3.put("longitude", "-80.2");
        places.add(place3); 

        HashMap<String, String> place4= new HashMap<>();
        place4.put("name", "Boulder");
        place4.put("latitude", "40.0");
        place4.put("longitude", "-105.4");
        places.add(place4);        

        conf = new TourRequest(earthRadius, response, places);
        conf.buildResponse();
        ArrayList<HashMap<String, String>> tour = conf.getPlaces();

        ArrayList<HashMap<String, String>> expectedTour = new ArrayList<>();
        expectedTour.add(place1);
        expectedTour.add(place2);
        expectedTour.add(place3);
        expectedTour.add(place4);
        assertEquals(expectedTour, tour);
    }

    @Test
    @DisplayName("Three places, two of which are the same distance from the start")
    public void testSameDistancePlaces() {
        HashMap<String, String> place1 = new HashMap<>();
        place1.put("name", "place1");
        place1.put("latitude", "40.0");
        place1.put("longitude", "-105.0");
        places.add(place1);

        HashMap<String, String> place2= new HashMap<>();
        place2.put("name", "place2");
        place2.put("latitude", "41.0");
        place2.put("longitude", "-105.0");
        places.add(place2);

        HashMap<String, String> place3 = new HashMap<>();
        place3.put("name", "place3");
        place3.put("latitude", "39.0");
        place3.put("longitude", "-105.0");
        places.add(place3);     

        conf = new TourRequest(earthRadius, response, places);
        conf.buildResponse();
        ArrayList<HashMap<String, String>> tour = conf.getPlaces();

        ArrayList<HashMap<String, String>> expectedTour = new ArrayList<>();
        expectedTour.add(place1);
        expectedTour.add(place2);
        expectedTour.add(place3);
        assertEquals(expectedTour, tour);
    }

    @Test
    @DisplayName("Three of the same places")
    public void testSamePlaces() {
        HashMap<String, String> place1 = new HashMap<>();
        place1.put("name", "place1");
        place1.put("latitude", "40.0");
        place1.put("longitude", "-105.0");
        places.add(place1);

        HashMap<String, String> place2= new HashMap<>();
        place2.put("name", "place2");
        place2.put("latitude", "40.0");
        place2.put("longitude", "-105.0");
        places.add(place2);

        HashMap<String, String> place3 = new HashMap<>();
        place3.put("name", "place3");
        place3.put("latitude", "40.0");
        place3.put("longitude", "-105.0");
        places.add(place3);     

        conf = new TourRequest(earthRadius, response, places);
        conf.buildResponse();
        ArrayList<HashMap<String, String>> tour = conf.getPlaces();

        ArrayList<HashMap<String, String>> expectedTour = new ArrayList<>();
        expectedTour.add(place1);
        expectedTour.add(place2);
        expectedTour.add(place3);
        assertEquals(expectedTour, tour);
    }

    @Test
    @DisplayName("Eleven Places all around america optimization")
    public void testAmericaPlaces() {
        HashMap<String, String> place1 = new HashMap<>();
        place1.put("name", "Seattle Tacoma International Airport");
        place1.put("latitude", "47.44900131225586");
        place1.put("longitude", "-122.30899810791016");
        places.add(place1);

        HashMap<String, String> place2= new HashMap<>();
        place2.put("name", "Albuquerque International Sunport Airport");
        place2.put("latitude", "35.040199279785156");
        place2.put("longitude", "-106.60900115966797");
        places.add(place2);

        HashMap<String, String> place3 = new HashMap<>();
        place3.put("name", "Sacramento International Airport");
        place3.put("latitude", "38.69540023803711");
        place3.put("longitude", "-121.59100341796875");
        places.add(place3);     

        HashMap<String, String> place4 = new HashMap<>();
        place4.put("name", "Memphis International Airport");
        place4.put("latitude", "35.04240036010742");
        place4.put("longitude", "-89.97669982910156");
        places.add(place4);    

        HashMap<String, String> place5 = new HashMap<>();
        place5.put("name", "Los Angeles International Airport");
        place5.put("latitude", "33.94250107");
        place5.put("longitude", "-118.4079971");
        places.add(place5);    

        HashMap<String, String> place6 = new HashMap<>();
        place6.put("name", "Portland Downtown Heliport");
        place6.put("latitude", "45.525299072265625");
        place6.put("longitude", "-122.6709976196289");
        places.add(place6);    

        HashMap<String, String> place7 = new HashMap<>();
        place7.put("name", "Tucson International Airport");
        place7.put("latitude", "32.1161003112793");
        place7.put("longitude", "-110.94100189208984");
        places.add(place7);    

        HashMap<String, String> place8 = new HashMap<>();
        place8.put("name", "Nashville International Airport");
        place8.put("latitude", "36.1245002746582");
        place8.put("longitude", "-86.6781997680664");
        places.add(place8);    

        HashMap<String, String> place9 = new HashMap<>();
        place9.put("name", "Phoenix Sky Harbor International Airport");
        place9.put("latitude", "33.43429946899414");
        place9.put("longitude", "-112.01200103759766");
        places.add(place9);    

        HashMap<String, String> place10 = new HashMap<>();
        place10.put("name", "Baylor University Medical Center Dallas Heliport");
        place10.put("latitude", "32.788331");
        place10.put("longitude", "-96.7801");
        places.add(place10);    

        HashMap<String, String> place11 = new HashMap<>();
        place11.put("name", "Charlotte Douglas International Airport");
        place11.put("latitude", "35.2140007019043");
        place11.put("longitude", "-80.94309997558594");
        places.add(place11);    

        conf = new TourRequest(earthRadius, response, places);
        conf.buildResponse();
        ArrayList<HashMap<String, String>> tour = conf.getPlaces();

        ArrayList<HashMap<String, String>> expectedTour = new ArrayList<>();
        expectedTour.add(place1);
        expectedTour.add(place11);
        expectedTour.add(place8);
        expectedTour.add(place4);
        expectedTour.add(place10);
        expectedTour.add(place2);
        expectedTour.add(place7);
        expectedTour.add(place9);
        expectedTour.add(place5);
        expectedTour.add(place3);
        expectedTour.add(place6);
        assertEquals(expectedTour, tour);
    }

    @Test
    @DisplayName("Ten Places worldwide test")
    public void testWorldPlaces() {
        HashMap<String, String> place1 = new HashMap<>();
        place1.put("name", "P1");
        place1.put("latitude", "-20.01");
        place1.put("longitude", "34.54");
        places.add(place1);

        HashMap<String, String> place2= new HashMap<>();
        place2.put("name", "P2");
        place2.put("latitude", "35.40");
        place2.put("longitude", "-173.60");
        places.add(place2);

        HashMap<String, String> place3 = new HashMap<>();
        place3.put("name", "P3");
        place3.put("latitude", "-84.62");
        place3.put("longitude", "53.64");
        places.add(place3);     

        HashMap<String, String> place4 = new HashMap<>();
        place4.put("name", "P4");
        place4.put("latitude", "18.45");
        place4.put("longitude", "-66.06");
        places.add(place4);    

        HashMap<String, String> place5 = new HashMap<>();
        place5.put("name", "P5");
        place5.put("latitude", "-54.48");
        place5.put("longitude", "-67.22");
        places.add(place5);    

        HashMap<String, String> place6 = new HashMap<>();
        place6.put("name", "P6");
        place6.put("latitude", "34.71");
        place6.put("longitude", "135.5");
        places.add(place6);    

        HashMap<String, String> place7 = new HashMap<>();
        place7.put("name", "P7");
        place7.put("latitude", "40.6");
        place7.put("longitude", "-105.1");
        places.add(place7);    

        HashMap<String, String> place8 = new HashMap<>();
        place8.put("name", "P8");
        place8.put("latitude", "45.44");
        place8.put("longitude", "12.31");
        places.add(place8);    

        HashMap<String, String> place9 = new HashMap<>();
        place9.put("name", "P9");
        place9.put("latitude", "-12.97");
        place9.put("longitude", "-38.41");
        places.add(place9);    

        HashMap<String, String> place10 = new HashMap<>();
        place10.put("name", "P10");
        place10.put("latitude", "32.94");
        place10.put("longitude", "90.12");
        places.add(place10);      

        conf = new TourRequest(earthRadius, response, places);
        conf.buildResponse();
        ArrayList<HashMap<String, String>> tour = conf.getPlaces();

        ArrayList<HashMap<String, String>> expectedTour = new ArrayList<>();
        expectedTour.add(place1);
        expectedTour.add(place8);
        expectedTour.add(place10);
        expectedTour.add(place6);
        expectedTour.add(place2);
        expectedTour.add(place7);
        expectedTour.add(place4);
        expectedTour.add(place9);
        expectedTour.add(place5);
        expectedTour.add(place3);
        assertEquals(expectedTour, tour);
    }

    @Test
    @DisplayName("Rotate index is correct")
    public void testRotateIndex() {
        int[] places = {1, 2, 0, 3};
        int rotateIndex = conf.getRotateIndex(places);
        assertEquals(2, rotateIndex);
    }
    // add more tests
}