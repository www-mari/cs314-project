package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.HashMap;

public class TestDistancesRequest {

    private DistancesRequest conf;

    private ArrayList<HashMap<String, String>> places = new ArrayList<>();
    private double earthRadius = 6371.0;

    @BeforeEach
    public void createConfigurationForTestCases() {       
        conf = new DistancesRequest(earthRadius, places);
        conf.buildResponse();
    }

    @Test
    @DisplayName("Request type is \"distances\"")
    public void testType() {
        String type = conf.getRequestType();
        assertEquals("distances", type);
    }

    @Test
    @DisplayName("No distances sent returns empty ArrayList")
    public void testSendNoDistances() {
        ArrayList<Number> distances = conf.getDistances();
        assertEquals(new ArrayList<Number>(), distances);
    }

    @Test
    @DisplayName("One distances sent returns 0")
    public void testSendOneDistances() {
        HashMap<String, String> place = new HashMap<>();
        place.put("latitude", "0");
        place.put("longitude", "0");
        places.add(place);
        conf = new DistancesRequest(earthRadius, places);
        conf.buildResponse();
        ArrayList<Number> distances = conf.getDistances();

        ArrayList<Number> expectedArray = new ArrayList<>();
        expectedArray.add(0);
        assertEquals(expectedArray, distances);
    }

    @Test
    @DisplayName("Two distances sent returns two of the same distance")
    public void testSendTwoDistances() {
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

        conf = new DistancesRequest(earthRadius, places);
        conf.buildResponse();
        ArrayList<Number> distances = conf.getDistances();

        ArrayList<Number> expectedArray = new ArrayList<>();
        expectedArray.add(Long.valueOf(Math.round(2039)));
        expectedArray.add(Long.valueOf(Math.round(2039)));
        assertEquals(expectedArray, distances);
    }
    
    @Test
    @DisplayName("Two exact same distances sent returns two of the same distance")
    public void testZeroZeroSameLocationDistance() {
        HashMap<String, String> place = new HashMap<>();
        // Place 1
        place.put("latitude", "0");
        place.put("longitude", "0");
        places.add(place);

        place = new HashMap<>();
        // Place 2
        place.put("latitude", "0");
        place.put("longitude", "0");
        places.add(place);

        conf = new DistancesRequest(earthRadius, places);
        conf.buildResponse();
        ArrayList<Number> distances = conf.getDistances();

        ArrayList<Number> expectedArray = new ArrayList<>();
        expectedArray.add(Long.valueOf(Math.round(0)));
        expectedArray.add(Long.valueOf(Math.round(0)));
        assertEquals(expectedArray, distances);
    }

    @Test
    @DisplayName("Two distances sent returns two of the same distance")
    public void testTwoLocationsInMilesDistances() {
        HashMap<String, String> place1 = new HashMap<>();
        // Place 1
        place1.put("latitude", "0");
        place1.put("longitude", "0");
        places.add(place1);

        HashMap<String, String> place2 = new HashMap<>();
        // Place 2
        place2.put("latitude", "1");
        place2.put("longitude", "1");
        places.add(place2);

        conf = new DistancesRequest(3958.8, places);
        conf.buildResponse();
        ArrayList<Number> distances = conf.getDistances();

        ArrayList<Number> expectedArray = new ArrayList<>();
        expectedArray.add(Long.valueOf(Math.round(98))); //This is for Statute Miles
        expectedArray.add(Long.valueOf(Math.round(98))); //Not nautical Miles
        assertEquals(expectedArray, distances);
    }

    @Test
    @DisplayName("Three distances, 2 same d, sent returns 2 of the same distance and 1 diff")
    public void testThreeLocationsInMilesDistances() {
        HashMap<String, String> place1 = new HashMap<>();
        // Place 1
        place1.put("latitude", "0");
        place1.put("longitude", "0");
        places.add(place1);

        HashMap<String, String> place2 = new HashMap<>();
        // Place 2
        place2.put("latitude", "1");
        place2.put("longitude", "1");
        places.add(place2);

        HashMap<String, String> place3 = new HashMap<>();
        // Place 2
        place3.put("latitude", "2");
        place3.put("longitude", "2");
        places.add(place3);

        conf = new DistancesRequest(3958.8, places);
        conf.buildResponse();
        ArrayList<Number> distances = conf.getDistances();

        ArrayList<Number> expectedArray = new ArrayList<>();
        expectedArray.add(Long.valueOf(Math.round(98))); //This is for Statute Miles
        expectedArray.add(Long.valueOf(Math.round(98))); //Not nautical Miles
        expectedArray.add(Long.valueOf(Math.round(195)));
        assertEquals(expectedArray, distances);
    }

    @Test
    @DisplayName("Three Random Distances")
    public void testThreeRandomDistances() {
        HashMap<String, String> place1 = new HashMap<>();
        // Place 1
        place1.put("latitude", "55.852572");
        place1.put("longitude", "-159.607656");
        places.add(place1);

        HashMap<String, String> place2 = new HashMap<>();
        // Place 2
        place2.put("latitude", "19.900106");
        place2.put("longitude", "-155.16510");
        places.add(place2);

        HashMap<String, String> place3 = new HashMap<>();
        // Place 2
        place3.put("latitude", "-36.155820");
        place3.put("longitude", "175.392955");
        places.add(place3);

        conf = new DistancesRequest(6371, places);
        conf.buildResponse();
        ArrayList<Number> distances = conf.getDistances();

        ArrayList<Number> expectedArray = new ArrayList<>();
        expectedArray.add(Long.valueOf(Math.round(4015))); //This is for Statute Miles
        expectedArray.add(Long.valueOf(Math.round(6960))); //Not nautical Miles
        expectedArray.add(Long.valueOf(Math.round(10502)));
        assertEquals(expectedArray, distances);
    }

    @Test
    @DisplayName("High Radius")
    public void HighRadius() {
        HashMap<String, String> place1 = new HashMap<>();
        // Place 1
        place1.put("latitude", "39.9042");
        place1.put("longitude", "116.4076");
        places.add(place1);

        HashMap<String, String> place2 = new HashMap<>();
        // Place 2
        place2.put("latitude", "50.0755");
        place2.put("longitude", "14.4378");
        places.add(place2);

        HashMap<String, String> place3 = new HashMap<>();
        // Place 2
        place3.put("latitude", "4.7110");
        place3.put("longitude", "-74.0721");
        places.add(place3);

        conf = new DistancesRequest(100000.0, places);
        conf.buildResponse();
        ArrayList<Number> distances = conf.getDistances();

        ArrayList<Number> expectedArray = new ArrayList<>();
        expectedArray.add(Long.valueOf(Math.round(117032))); //This is for Statute Miles
        expectedArray.add(Long.valueOf(Math.round(149109))); //Not nautical Miles
        expectedArray.add(Long.valueOf(Math.round(234492)));
        assertEquals(expectedArray, distances);
    }

    @Test
    @DisplayName("Much Higher Radius")
    public void MuchHigherRadius() {
        HashMap<String, String> place1 = new HashMap<>();
        // Place 1
        place1.put("latitude", "39.9042");
        place1.put("longitude", "116.4076");
        places.add(place1);

        HashMap<String, String> place2 = new HashMap<>();
        // Place 2
        place2.put("latitude", "50.0755");
        place2.put("longitude", "14.4378");
        places.add(place2);

        HashMap<String, String> place3 = new HashMap<>();
        // Place 2
        place3.put("latitude", "4.7110");
        place3.put("longitude", "-74.0721");
        places.add(place3);

        conf = new DistancesRequest(123456789.0, places);
        conf.buildResponse();
        ArrayList<Number> distances = conf.getDistances();

        ArrayList<Number> expectedArray = new ArrayList<>();
        expectedArray.add(Long.valueOf(144483567)); //This is for Statute Miles
        expectedArray.add(Long.valueOf(184085774)); //Not nautical Miles
        expectedArray.add(Long.valueOf(289495817));
        assertEquals(expectedArray, distances);
    }

    @Test
    @DisplayName("Small Radius test with 5 locations")
    public void SmallRadius() {
        HashMap<String, String> place1 = new HashMap<>();
        // Place 1
        place1.put("latitude", "38.510249");
        place1.put("longitude", "-121.499058");
        places.add(place1);

        HashMap<String, String> place2 = new HashMap<>();
        // Place 2
        place2.put("latitude", "39.704417");
        place2.put("longitude", "-105.087951");
        places.add(place2);

        HashMap<String, String> place3 = new HashMap<>();
        // Place 3
        place3.put("latitude", "40.414625");
        place3.put("longitude", "-104.708928");
        places.add(place3);

        HashMap<String, String> place4 = new HashMap<>();
        // Place 4
        place4.put("latitude", "40.543482");
        place4.put("longitude", "-105.058102");
        places.add(place4);

        HashMap<String, String> place5 = new HashMap<>();
        // Place 5
        place5.put("latitude", "35.683269");
        place5.put("longitude", "139.750648");
        places.add(place5);

        conf = new DistancesRequest(1.0, places);
        conf.buildResponse();
        ArrayList<Number> distances = conf.getDistances();

        ArrayList<Number> expectedArray = new ArrayList<>();
        expectedArray.add(Long.valueOf(Math.round(0)));
        expectedArray.add(Long.valueOf(Math.round(0)));
        expectedArray.add(Long.valueOf(Math.round(0)));
        expectedArray.add(Long.valueOf(Math.round(1)));
        expectedArray.add(Long.valueOf(Math.round(1)));
        assertEquals(expectedArray, distances);
    }
    // add more tests 
}
