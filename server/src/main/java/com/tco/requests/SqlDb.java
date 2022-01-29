package com.tco.requests;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;

public class SqlDb {

    private Integer LIMIT = 10;

    static class Place extends HashMap<String,String> {}
    static class Places extends ArrayList<Place> {}

    public static void main(String[] args) {

    }

    public ArrayList<HashMap<String, String>> sendQuery(String match, Integer limit){
        if(limit == 0){
            limit = 2147483647;
        }
        try {
            this.LIMIT = limit;
            Credential credential = new Credential();
            String query = Select.generateSqlQueryString(LIMIT, match);
            Places places = Database.query(query, credential);

            ArrayList<HashMap<String, String>> returnPlaces = new ArrayList<HashMap<String, String>>();
            for (Place place : places){
                returnPlaces.add(place);
            }
            return returnPlaces;

        } catch (Exception e) {
            System.err.println("sendQuery Exception: " + e.getMessage());
        }
        return null;
    }

    public Integer sendCountQuery(String match){
        try {
            Credential credential = new Credential();
            String query = Select.generateCountString(match);
            Integer count = Database.queryCount(query, credential);

            return count;

        } catch (Exception e) {
            System.err.println("sendCountQuery Exception: " + e.getMessage());
        }
        return null;
    }

    static class Credential {
        // shared user with read-only access
        final static String USER = "cs314-db";
        final static String PASSWORD = "eiK5liet1uej";
        // connection information when using port forwarding from localhost
        String URL = " <><><> if you are reading this then URL was not correctly set! <><><> ";
        public String getUrl(){
            String useTunnel = System.getenv("CS314_USE_DATABASE_TUNNEL");
            if(useTunnel != null && useTunnel.equals("true")) {
                return this.URL = "jdbc:mariadb://localhost:56789/cs314";
            }
            // Else, we must be running against the production database directly
            else {
                return this.URL = "jdbc:mariadb://faure.cs.colostate.edu/cs314";
            }
        }
        public String getUser(){
            return USER;
        }
        public String getPassword(){
            return PASSWORD;
        }
    }

    static class Select {
        static String generateSqlQueryString(int limit, String match) {
            return "SELECT world.id, world.name, world.type, world.municipality, region.name, country.name, continent.name, world.longitude, world.latitude "
                    + " FROM continent "
                    + " INNER JOIN country ON continent.id=country.continent"
                    + " INNER JOIN region ON country.id=region.iso_country"
                    + " INNER JOIN world ON region.id=world.iso_region"
                    + " WHERE country.name LIKE '%" + match + "%' "
                    + " OR region.name LIKE '%" + match + "%' "
                    + " OR world.name LIKE '%" + match + "%' "
                    + " OR world.id LIKE '%" + match + "%' "
                    + " OR world.municipality LIKE '%" + match + "%' "
                    + " ORDER BY continent.name, country.name, region.name, world.municipality, world.name, world.id ASC"
                    + " LIMIT " + Integer.toString(limit)
                    + ";";
        }

        static String generateCountString(String match) {
            return "SELECT COUNT(DISTINCT world.id, world.name, world.municipality, region.name, country.name, continent.name, world.longitude, world.latitude) "
                    + "AS count "        
                    + " FROM continent "
                    + " INNER JOIN country ON continent.id=country.continent"
                    + " INNER JOIN region ON country.id=region.iso_country"
                    + " INNER JOIN world ON region.id=world.iso_region"
                    + " WHERE country.name LIKE '%" + match + "%' "
                    + " OR region.name LIKE '%" + match + "%' "
                    + " OR world.name LIKE '%" + match + "%' "
                    + " OR world.id LIKE '%" + match + "%' "
                    + " OR world.municipality LIKE '%" + match + "%' "
                    + " ORDER BY continent.name, country.name, region.name, world.municipality, world.name, world.id ASC"
                    + ";";
        }
    }

    static class Database {
        static Places query(String sql, Credential db) throws Exception {
            try (
                // connect to the database and query
                Connection conn = DriverManager.getConnection(db.getUrl(), db.getUser(), db.getPassword());
                Statement query = conn.createStatement();
                ResultSet results = query.executeQuery(sql)
            ) {
                return convertQueryResultsToPlaces(results);
            } catch (Exception e) {
                throw e;
            }
        }

        static Integer queryCount(String sql, Credential db) throws Exception {
            try (
                    // connect to the database and query
                    Connection conn = DriverManager.getConnection(db.getUrl(), db.getUser(), db.getPassword());
                    Statement query = conn.createStatement();
                    ResultSet results = query.executeQuery(sql);
            ) {
                results.next();
                return results.getInt("count");
            } catch (Exception e) {
                throw e;
            }
        }

        static Places convertQueryResultsToPlaces(ResultSet results) throws Exception {
            int count = 0;
            Places places = new Places();
            while (results.next()) {
                Place place = new Place();
                place.put("country", results.getString("country.name"));
                place.put("type", results.getString("world.type"));
                place.put("state", results.getString("region.name"));
                place.put("longitude", results.getString("world.longitude"));
                place.put("latitude", results.getString("world.latitude"));
                place.put("name", results.getString("world.name"));
                place.put("id", results.getString("world.id"));
                place.put("city", results.getString("world.municipality"));
                place.put("index", String.format("%d",++count));
                places.add(place);
            }
            return places;
        }
    }
}