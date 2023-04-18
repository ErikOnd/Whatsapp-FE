import { Dispatch } from "redux";

export const postUserAction = (user: {
  username: string;
  email: string;
  password: string;
}) => {
  return async (dispatch: Dispatch) => {
    try {
      let response = await fetch(`${process.env.REACT_APP_BE_URL}/users`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("posted");
        let data = response.json();
        return data;
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const postUserImageAction = (userId: string, file: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const formData = new FormData();
      formData.append("userImg", file);
      let response = await fetch(
        `${process.env.REACT_APP_BE_URL}/users/${userId}/image`,
        {
          method: "PUT",
          body: formData,
        }
      );

      console.log(response);
      if (response.ok) {
        console.log("You made it!");
      } else {
        console.log("Try harder!");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
