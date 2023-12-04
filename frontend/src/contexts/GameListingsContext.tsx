import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { GameListing } from '../models/GameListing';

const GameListingsContext = createContext<GameListing[]>([]);

export const useListings = (): GameListing[] => {
  const [listings, setListings] = useState<GameListing[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('http://localhost:5172/listings');
        setListings(response.data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  return listings;
};

export const GameListingsProvider = ({ children }: { children: ReactNode }) => {
  const listings = useListings();

  return <GameListingsContext.Provider value={listings}>{children}</GameListingsContext.Provider>;
};