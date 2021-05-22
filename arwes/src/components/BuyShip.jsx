import React, {useContext} from 'react';
import appContext from './Context';
import { Button, Heading, Link, Words } from "arwes";
import {FaTimesCircle} from 'react-icons/fa'
const style = {
    wrapper: {padding: '2rem'},
    buttonContainer: {
        paddingTop: '1rem',
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    exitButton: {
      float: 'right',
      postion: 'relative',
      bottom: 15,
    }

}
const BuyShip = ({ ship, rerenderParent, closeModal }) => {
  const { user, id, token } = useContext(appContext);
  const userCanBuy = user.credit >= ship.sale_price;
  const shipName = ship.custom_name || ship.starship_type.type_name;

  const buyShip = async () => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        buyer: id,
        seller: ship.user.id,
        starship: ship.id,
        sale_price: ship.sale_price,
      }),
    });
    const data = res.json();
    if (data.error) {
      alert(
        "It looks like there was some force interference and your transaction could not be processed. Please try again later."
      );
    } else {
      closeModal();
      rerenderParent();
    }
  };
  return (
    <div style={style.wrapper}>
      <Button onClick={closeModal} style={style.exitButton}>
        <FaTimesCircle />
      </Button>
      <Heading node="h3">Buy {shipName}</Heading>
      {id ? (
        userCanBuy ? (
          <Words layer="primary">
            <div>
              <p>Are you sure you want to buy {shipName}?</p>
              <p>
                The ship costs {ship.sale_price}, and you have {user.credit}.
                After this purchase you will have{" "}
                {user.credit - ship.sale_price} credits remaining.
              </p>
              <div>
                <Button onClick={buyShip}>Buy Ship</Button>
              </div>
            </div>
          </Words>
        ) : (
          <div>
            <p>
              It looks like you don't have enough credits to buy {shipName}.
            </p>
            <p>
              {shipName} costs {ship.sale_price} credits.
            </p>
            <p>Your current credit balance is: {user.credit}</p>
            <p>You can add credits on your profile page.</p>
            <Link href="/profile">
              <Button>Go to Profile</Button>
            </Link>
          </div>
        )
      ) : (
        <Words layer="primary">
          <div>
            <p>
              It looks like you're not logged in. Please log in or create an
              account to buy {shipName}.
            </p>
            <div style={style.buttonContainer}>
              <Link href="/login">
                <Button>Log In</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
        </Words>
      )}
    </div>
  );
};

export default BuyShip;