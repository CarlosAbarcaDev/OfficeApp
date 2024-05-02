import create from 'zustand';
import axios from 'axios';


interface OfficeState {
    characters: [] ;
    characterDetails: CharacterDetail | null;
    error: string | null;
    meta: Meta;
    loading: boolean;
    loadCharacters: (page: number) => Promise<void>;
    loadCharacterDetails: (id: string) => Promise<void>;
  }
  
 interface CharacterDetail {
  id: string;
  name: string;
  actor: string;
  gender: string;
  workplace: [];
  marital: string;
  spouse: string;
  firstAppearance: string;
  lastAppearance: string;
  job: [];
}

interface Meta {
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
  pageCount: number;
}

  const useOfficeStore = create<OfficeState>((set) => ({
    characters: [] ,
    characterDetails: null,
    meta: {
      isFirstPage: true,
      isLastPage: false,
      currentPage: 1,
      previousPage: null,
      nextPage: null,
      pageCount: 0,
    },
    error: null,
    loading: false,
  
    loadCharacters: async (page: number) => {
      set({ loading: true, error: null });
      try {
        const response = await axios.get(`https://theofficeapi.dev/api/characters?page=${page}`);
        set({  characters: response.data.results,
          meta: response.data.meta,
          loading: false});
      } catch (error) {
        console.error(error);
        set({ error: 'Failed to fetch characters', loading: false });
      }
    },
  
    loadCharacterDetails: async (id: string) => {
      set({ loading: true, error: null });
      try {
        const response = await axios.get(`https://theofficeapi.dev/api/character/${id}`);
        set({ characterDetails: response.data, loading: false });
      } catch (error) {
        console.error(error);
        set({ error: 'Failed to fetch character details', loading: false });
      }
    }
  }));
  
  export default useOfficeStore;