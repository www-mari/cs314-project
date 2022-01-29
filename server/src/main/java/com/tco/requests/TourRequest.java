package com.tco.requests;

import java.util.ArrayList;
import java.util.HashMap;

import java.lang.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TourRequest extends RequestHeader {

    private final transient Logger log = LoggerFactory.getLogger(TourRequest.class);

    private final double earthRadius;
    private ArrayList<HashMap<String, String>> places;
    private final Number response;


    @Override
    public void buildResponse() {
      TourVars tourVars = new TourVars();
      if(tourVars.doOpt()) {
        ArrayList<HashMap<String, String>> optimizedTour = new ArrayList<HashMap<String, String>>();
        tourVars.best = nearestNeighbor(tourVars);
        int rotateIndex = getRotateIndex(tourVars.best);//gets initial start location
        for (int i = 0; i < tourVars.best.length; i++) {
          optimizedTour.add(places.get(tourVars.best[(i + rotateIndex) % tourVars.best.length]));//sometimes it works
        }
        places = optimizedTour;
      }
    }

    private class TourVars {
      private final int[] tour;
      private boolean[] visited;
      private double[] distances;
      private final long startTime;
      private long workingTime;
      private final double margin;
      int[] best;

      TourVars(){
        margin = (response.doubleValue() * 900) - (places.size() * .25);
        startTime = System.currentTimeMillis();
        workingTime = startTime - System.currentTimeMillis();
        tour = new int[places.size()];
        best =  new int[places.size()];
      }

      public boolean doOpt(){
        return (places.size() > 0 && (response.doubleValue() >= 0.1 || this.margin >= 0) && places.size() < 101);
      }
    }

    public int getRotateIndex(int[] best){
      for(int i = 0; i < best.length; i++){
        if(best[i] == 0){
          return i;
        }
      }
      return 0;
    }

    public int[] nearestNeighbor(TourVars tourVars){
      int[] bestTour = new int[tourVars.tour.length];
      int[] current = new int[tourVars.tour.length];
        for(int i = 0; i < tourVars.tour.length; i++){
          current = createNearestNeighborTour(i,tourVars);
          if(i == 0 || getTourDistance(current,tourVars) < getTourDistance(bestTour,tourVars)){
            bestTour = current;
          }
          tourVars.workingTime = (System.currentTimeMillis() - tourVars.startTime);
          if(tourVars.workingTime > tourVars.margin){
            break;
          }
        } return bestTour;
    }

    public int[] createNearestNeighborTour(int start,TourVars tourVars){
      tourVars.tour[0] = start;
      int currentIndex = 1;
      tourVars.visited = new boolean[places.size()];
      tourVars.visited[start] = true;
      int next = start;
      while(visitedContainsFalse(tourVars) && currentIndex < tourVars.tour.length){
        next = closest(next,tourVars);
        tourVars.tour[currentIndex] = next;
        tourVars.visited[next] = true;
        currentIndex++;
      }
      return tourVars.tour;
    }

    public int closest(int index,TourVars tourVars){
      DistancesRequest distancesRequest = new DistancesRequest(3958);
      double shortestDistance = -1;
      int shortestIndex = tourVars.visited.length - 1;
      double currentDistance = -1;
      tourVars.workingTime = (System.currentTimeMillis() - tourVars.startTime);
      for(int i = 0; i < tourVars.visited.length; i++){
        if(tourVars.workingTime > tourVars.margin){
          break;
        }
        if(!tourVars.visited[i] && i != index){
          currentDistance = distancesRequest.calculateDistance(places.get(i), places.get(index)).doubleValue();
          if(currentDistance < shortestDistance || shortestDistance == -1.0){
            shortestDistance = currentDistance;
            shortestIndex = i;
          }
        }
      }
      return shortestIndex;
    }

    public boolean visitedContainsFalse(TourVars tourVars){
      for(int i = 0; i < tourVars.visited.length; i++){
        if(!tourVars.visited[i]){
          return true;
        }
      }
      return false;
    }

    public double getTourDistance(int[] arr,TourVars tourVars){
      ArrayList<HashMap<String, String>> inputPlace = new ArrayList<HashMap<String, String>>();
      for(int i = 0; i < arr.length; i++){
        inputPlace.add(places.get(arr[i]));
      }
      DistancesRequest distancesRequest = new DistancesRequest(earthRadius, inputPlace);
      distancesRequest.buildResponse();
      ArrayList<Number> outputDist = distancesRequest.getDistances();
      double total = 0.0;
      for(int i = 0; i < outputDist.size(); i++){
        total += outputDist.get(i).doubleValue();
      }
      return total;
    }

  /* The following methods exist only for testing purposes and are not used
  during normal execution, including the constructor. */

    public TourRequest(double earthRadius, Number response, ArrayList<HashMap<String, String>> places) {
      this.requestType = "tour";
      this.earthRadius = earthRadius;
      this.response = response;
      this.places = places;
    }

    public String getRequestType() {
      return this.requestType;
    }

    public ArrayList<HashMap<String, String>> getPlaces() {
      return this.places;
    }

    public Number getResponseTime() {
      return this.response;
    } 
}