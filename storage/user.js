import Cookies from 'js-cookie';


export const setUserDetails = (data) => {
    Cookies.set("typeData", btoa(JSON.stringify(data)));
};

export const clearUserDetails = () => {
    Cookies.remove("typeData");
};

export const getUserDetails = () => {
    const typeData = Cookies.get("typeData");
    if (!typeData) {
      return null;
    }

    try {
      const userData = JSON.parse(atob(typeData));
      return userData;
    } catch (e) {
      console.error("Error parsing user data:", e);
      return null;
    }
};

export const setEntityData = (data) => {
    Cookies.set("entityData", btoa(JSON.stringify(data)));
};

export const getEntityData = () => {
    const entityData = Cookies.get("entityData");
    if (!entityData) {
      return null;
    }

    try {
      const data = JSON.parse(atob(entityData));
      return data;
    } catch (e) {
      console.error("Error parsing entity data:", e);
      return null;
    }
};
