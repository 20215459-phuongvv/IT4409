import React from "react";
import classNames from "classnames/bind";
import styles from './AddressCard.module.scss'

const cx = classNames.bind(styles);


const AddressCard = ({address}) => {
  return (
    <div>
      {/* <h1 className="text-lg font-semibold py-4">Delivery Adress</h1> */}
      <div className={cx("space-y-3")}>
        <p className={cx("font-semibold")}>{`${address?.firstName} ${address?.lastName}`}</p>

        <p>
          {`${address?.streetAddress} ${address?.city} ${address?.state} ${address?.zipCode}`}
        </p>

        <div className={cx("space-y-1")}>
          <p className={cx("font-semibold")}>Phone Number</p>
          <p>{address?.mobile}</p>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
