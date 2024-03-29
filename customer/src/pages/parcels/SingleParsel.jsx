import { Avatar, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../components/loader/Loader";
import Title from "../../components/title/Title";

const SingleParsel = () => {
  // GET PARCEL DETAILS
  const { id } = useParams();
  const [parcel, setParcel] = useState({});
  const [customerID, setCustomerID] = useState("");
  const [laoding, setLoading] = useState(false);
  useEffect(() => {
    const fatchCustomer = async () => {
      const { data } = await axios.get(`/api/admin/parcels/${id}`, {
        headers: {
          Authorization: localStorage.getItem("cToken"),
        },
      });
      setParcel(data);
      setCustomerID(data.customerID);
      setLoading(true);
    };
    fatchCustomer();
  }, [id]);

  // GET CUSTOMER DETAILS
  const [customer, setCustomer] = useState({});
  useEffect(() => {
    const fatchCustomer = async () => {
      const { data } = await axios.get(`/api/admin/customers/${customerID}`, {
        headers: {
          Authorization: localStorage.getItem("cToken"),
        },
      });
      setCustomer(data);
    };
    fatchCustomer();
  }, [customer, customerID]);

  // GET RIDER DETAILS
  const [picRider, setPicRider] = useState({});
  const [dlvRider, setDlvRider] = useState({});
  useEffect(() => {
    if (parcel.picRiderID !== "NaN") {
      const fatchPicRider = async () => {
        const { data } = await axios.get(
          `/api/admin/riders/${parcel.picRiderID}`,
          {
            headers: {
              Authorization: localStorage.getItem("cToken"),
            },
          }
        );
        setPicRider(data);
      };
      fatchPicRider();
    }
    if (parcel.dlvRiderID !== "NaN") {
      const fatchDlvRider = async () => {
        const { data } = await axios.get(
          `/api/admin/riders/${parcel.dlvRiderID}`,
          {
            headers: {
              Authorization: localStorage.getItem("cToken"),
            },
          }
        );
        setDlvRider(data);
      };
      fatchDlvRider();
    }
  }, [picRider, parcel.picRiderID, dlvRider, parcel.dlvRiderID]);

  // Parcel delete
  const deleteHandler = (id) => {
    Swal.fire({
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/admin/parcels/${id}`, {
            headers: {
              Authorization: localStorage.getItem("cToken"),
            },
          })
          .then((response) => {
            Swal.fire({
              icon: "success",
              text: "Parcel deleted!",
              showConfirmButton: false,
              timer: 1000,
            }).then(() => (window.location.href = "/parcels"));
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Parcel delete field!",
            });
          });
      }
    });
  };

  return (
    <div>
      <div className="singleParcel">
        <Title title="Parcel Details" />
        <div className="content">
          {laoding ? (
            <div className="parcelInner">
              <div className="parcelBox">
                <h4>Customer Detais</h4>
                <div className="profileBox">
                  <table>
                    <tbody>
                      <tr>
                        <td colSpan={2}>
                          {customer.thumb ? (
                            <Avatar
                              alt={customer.name}
                              src={"/customers/" + customer.thumb}
                            />
                          ) : (
                            <Avatar
                              alt={customer.name}
                              src="/img/placeholder.png"
                            />
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th>Name:</th>
                        <td>{customer.name}</td>
                      </tr>
                      <tr>
                        <th>Email:</th>
                        <td>{customer.email}</td>
                      </tr>
                      <tr>
                        <th>Phone:</th>
                        <td>{customer.phone}</td>
                      </tr>
                      <tr>
                        <th>Gender:</th>
                        <td>{customer.gender}</td>
                      </tr>
                      <tr>
                        <th>Address:</th>
                        <td>{customer.address}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="parcelBox">
                <h4>Parcel Detais</h4>
                <div className="profileBox">
                  <table>
                    <tbody>
                      <tr>
                        <th>Type:</th>
                        <td>{parcel.type}</td>
                      </tr>
                      <tr>
                        <th>Note:</th>
                        <td>
                          <span className="note bold">{parcel.note}</span>
                        </td>
                      </tr>
                      <tr>
                        <th>Weight:</th>
                        <td>{parcel.weight} kg</td>
                      </tr>
                      <tr>
                        <th>Length:</th>
                        <td>{parcel.length} inch</td>
                      </tr>
                      <tr>
                        <th>Total price:</th>
                        <td>{parcel.totalPrice} ৳</td>
                      </tr>
                      <tr>
                        <th>Payment:</th>
                        <td>{parcel.payment}</td>
                      </tr>
                      <tr>
                        <th>Status:</th>
                        <td>
                          <span className={parcel.status}>{parcel.status}</span>
                        </td>
                      </tr>
                      <tr>
                        <th>Order Date:</th>
                        <td>{new Date(parcel.orderDate).toLocaleString()}</td>
                      </tr>
                      <tr>
                        <th>Accept Date:</th>
                        <td>
                          {parcel.acceptTime
                            ? new Date(parcel.acceptTime).toLocaleString()
                            : "NaN"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="parcelBox">
                <h4>Delivery Detais</h4>
                <div className="profileBox">
                  <table>
                    <tbody>
                      <tr>
                        <th>Name:</th>
                        <td>{parcel.recName}</td>
                      </tr>
                      <tr>
                        <th>Phone:</th>
                        <td>{parcel.recPhone}</td>
                      </tr>
                      <tr>
                        <th>Email:</th>
                        <td>{parcel.recEmail}</td>
                      </tr>
                      <tr>
                        <th>Address:</th>
                        <td>{parcel.recAddress}</td>
                      </tr>
                      <tr>
                        <th>Send:</th>
                        <td>{parcel.sendLocation}</td>
                      </tr>
                      <tr>
                        <th>End:</th>
                        <td>{parcel.endLocation}</td>
                      </tr>
                      <tr>
                        <th>Duration:</th>
                        <td>{parcel.duration} Days</td>
                      </tr>
                      <tr>
                        <th>Map:</th>
                        <td className="tableAction">
                          <Link
                            to={`https://www.google.com/maps/dir/${parcel.sendLocation}/${parcel.recAddress}/`}
                            className="view"
                            target="_blank"
                          >
                            <i class="ri-road-map-fill"></i>
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {parcel.picRiderID !== "NaN" && (
                <div className="parcelBox">
                  <h4>Pickup Man</h4>
                  <div className="profileBox">
                    <table>
                      <tbody>
                        <tr>
                          <td colSpan={2}>
                            {picRider.thumb ? (
                              <Avatar
                                src={"/riders/" + picRider.thumb}
                                alt={picRider.name}
                              />
                            ) : (
                              <Avatar
                                alt={picRider.name}
                                src="/img/placeholder.png"
                              />
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th>Name:</th>
                          <td>{picRider.name}</td>
                        </tr>
                        <tr>
                          <th>Email:</th>
                          <td>
                            <Link to={"mailto:" + picRider.email}>
                              {picRider.email}
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <th>Phone:</th>
                          <td>
                            <Link to={"tel:" + picRider.phone}>
                              {picRider.phone}
                            </Link>
                          </td>
                        </tr>

                        <tr>
                          <th>Gender:</th>
                          <td>{picRider.gender}</td>
                        </tr>
                        <tr>
                          <th>Address:</th>
                          <td>{picRider.address}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {parcel.dlvRiderID !== "NaN" && (
                <div className="parcelBox">
                  <h4>Delivery Man</h4>
                  <div className="profileBox">
                    <table>
                      <tbody>
                        <tr>
                          <td colSpan={2}>
                            {dlvRider.thumb ? (
                              <Avatar
                                src={"/riders/" + dlvRider.thumb}
                                alt={dlvRider.name}
                              />
                            ) : (
                              <Avatar
                                alt={dlvRider.name}
                                src="/img/placeholder.png"
                              />
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th>Name:</th>
                          <td>{dlvRider.name}</td>
                        </tr>
                        <tr>
                          <th>Email:</th>
                          <td>
                            <Link to={"mailto:" + dlvRider.email}>
                              {dlvRider.email}
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <th>Phone:</th>
                          <td>
                            <Link to={"tel:" + dlvRider.phone}>
                              {dlvRider.phone}
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <th>Gender:</th>
                          <td>{dlvRider.gender}</td>
                        </tr>
                        <tr>
                          <th>Address:</th>
                          <td>{dlvRider.address}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {parcel.status === "Ordered" && (
                <div className="parcelBox">
                  <h4>Actions</h4>
                  <div className="form-box">
                    <Button
                      color="error"
                      variant="contained"
                      size="small"
                      onClick={() => deleteHandler(id)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleParsel;
