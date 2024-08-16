import { useEffect, useState } from "react";

const mediaInitialState = { mobile: false, tablet: false };

const getMediaWidth = (media) =>
  window.matchMedia(`(max-width: ${media}px)`).matches;

const getMediaQueryLocalStorage = () =>
  JSON.parse(localStorage.getItem("mediaQuery"));

const updateMediaQueryLocalStorage = (body) =>
  localStorage.setItem("mediaQuery", JSON.stringify(body));

const deleteMediaQueryLocalStorage = () =>
  localStorage.removeItem("mediaQuery");

function useMediaQuery() {
  const [media, setMedia] = useState(
    getMediaQueryLocalStorage() || mediaInitialState
  );
  useEffect(() => {
    const listener = () => {
      if (getMediaWidth("575")) {
        updateMediaQueryLocalStorage({ ...mediaInitialState, mobile: true });
        setMedia({ ...mediaInitialState, mobile: true });
      } else if (getMediaWidth("768")) {
        updateMediaQueryLocalStorage({ ...mediaInitialState, tablet: true });
        setMedia({ ...mediaInitialState, tablet: true });
      } else {
        deleteMediaQueryLocalStorage();
        setMedia(mediaInitialState);
      }
    };
    addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  });
  return { media };
}

export default useMediaQuery;
