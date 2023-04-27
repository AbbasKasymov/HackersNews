import React, { createContext, useReducer, useContext, useEffect } from "react";
import axios from "axios";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { api } from "../helpers/const";
import { Story } from "../types/Story";


const initialState = {
  loading: true,
  stories: [],
  visibleStories: [],
  pageSize: 10,
};

const actionTypes = {
  SET_LOADING: "SET_LOADING",
  SET_STORIES: "SET_STORIES",
  SET_VISIBLE_STORIES: "SET_VISIBLE_STORIES",
  SET_PAGE_SIZE: "SET_PAGE_SIZE",
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case actionTypes.SET_STORIES:
      return { ...state, stories: action.payload };
    case actionTypes.SET_VISIBLE_STORIES:
      return { ...state, visibleStories: action.payload };
    case actionTypes.SET_PAGE_SIZE:
      return { ...state, pageSize: action.payload };
    default:
      return state;
  }
};

export const mainContext = createContext<{
    state: typeof initialState;
    dispatch: React.Dispatch<any>;
    handleRefresh: () => void;
    handleMore: () => void;
    handleLess: () => void;
  }>({
    state: initialState,
    dispatch: () => null,
    handleRefresh: () => null,
    handleMore: () => null,
    handleLess: () => null,
  });


const MainPageContext = (props: any) => {

  const [state, dispatch] = useReducer(reducer, initialState);


  const fetchStories = async (dispatchFunc:any) => {
    dispatch({ type: actionTypes.SET_LOADING, payload: true });
    try {
      const response = await axios.get<number[]>(`${api}/newstories.json`);
      const storyIds = response.data;
      const stories = await Promise.all(
        storyIds.slice(0, 100).map(async (id: number) => {
          const storyResponse = await axios.get<any>(
            `${api}/item/${id}.json`
          );
          const story = storyResponse.data;
          return {
            id: story.id,
            title: story.title,
            author: story.by,
            date: story.time,
            comments: story.descendants,
            rating: story.score,
          } as Story;
        })
      );
      dispatch({ type: actionTypes.SET_STORIES, payload: stories });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({ type: actionTypes.SET_LOADING, payload: false });
    }
  };

  useEffect(() => {
    fetchStories(dispatch);
    const interval = setInterval(() => {
      fetchStories(dispatch);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    try {
      dispatch({
        type: actionTypes.SET_VISIBLE_STORIES,
        payload: state.stories.slice(0, state.pageSize),
      });
    } catch (error) {
      console.error(error);
    }
  }, [state.stories, state.pageSize]);



  const handleRefresh = () => {
    dispatch({ type: actionTypes.SET_LOADING, payload: true });
    return fetchStories(dispatch).finally(() =>
      dispatch({ type: actionTypes.SET_LOADING, payload: false })
    );
  };
  

  const handleMore = () => {
    dispatch({
      type: actionTypes.SET_PAGE_SIZE,
      payload: state.pageSize + 10,
    });
  };

  const handleLess = () => {
    dispatch({
      type: actionTypes.SET_PAGE_SIZE,
      payload: state.pageSize - 10,
    });
  };

  return (
    <mainContext.Provider
      value={{ dispatch, handleRefresh, handleMore, handleLess, state }}
    >
      {props.children}
    </mainContext.Provider>
  );
};

export default MainPageContext

