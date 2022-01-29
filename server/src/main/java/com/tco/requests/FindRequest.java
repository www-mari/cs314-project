package com.tco.requests;

import java.util.ArrayList;
import java.util.HashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FindRequest extends RequestHeader {

    private final transient Logger log = LoggerFactory.getLogger(FindRequest.class);

    private String match;
    private Integer limit;

    private Integer found;
    private ArrayList<HashMap<String, String>> places;

    @Override
    public void buildResponse() {
        SqlDb sqlDb = new SqlDb();
        places = sqlDb.sendQuery(match, limit);
        found = sqlDb.sendCountQuery(match);
        if(places.size() <= -1) {
            HashMap<String, String> data = new HashMap<String, String>();
            data.put("test_key","test_value");
            places = new ArrayList<HashMap<String, String>>();
            places.add(data);
            found = 0;
        }
    }

  /* The following methods exist only for testing purposes and are not used
  during normal execution, including the constructor. */

    public FindRequest(String match, Integer lim) {
        this.requestType = "find";
        this.match = match;
        this.limit = lim;
    }

    public String getRequestType() {
        return this.requestType;
    }

    public Integer getFound() {
        return 1; //this.found;
    }

    public ArrayList<HashMap<String, String>> getPlaces() {
        return this.places;
    }

}