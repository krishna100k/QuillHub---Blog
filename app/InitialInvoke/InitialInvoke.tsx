
import { cookies } from "next/headers";
import { UseDispatch, useDispatch } from "react-redux";




const InitialInvoke = () => {
  const fetchUser = async () => {
    try {
      const response = await fetch(`${process.env.base_url}/api/me`, {
        headers: { Cookie: cookies().toString() },
      });
      const user = await response.json();;
      console.log(user)
    } catch (err) {
      console.log(err);
    }
  };
  fetchUser();
  return <></>;
};

export default InitialInvoke;
