import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, FormCheck, Modal, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";

const Problem2 = () => {
  const [show, setShow] = useState(false);
  const [showC, setShowC] = useState(false);
  const [modal, setModal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [contact, setContact] = useState({});

  const containerRef = useRef(null);

  const [queryParams, setQueryparams] = useState({ search: "", page: 1 });

  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const showModal = (modalType) => {
    setModal(modalType);
    if (modalType === "Modal C") {
      setShowC(true);
      setShow(false);
      return;
    }
    setShow(true);
  };

  const hideModal = () => {
    setModal(null);

    setShowC(false);

    setShow(false);
  };

  const queryAll = useQuery(
    ["contacts", { ...queryParams, modal, page: currentPage }],
    () =>
      axios("https://contact.mediusware.com/api/contacts/", {
        params: { ...queryParams, page: currentPage },
      })
  );

  const queryUs = useQuery(
    ["contactsUs", { ...queryParams, modal, page: currentPage }],
    () =>
      axios(
        `https://contact.mediusware.com/api/country-contacts/united states/`,
        {
          params: { ...queryParams, page: currentPage },
        }
      )
  );

  const getData = () => {
    const data =
      modal === "Modal A"
        ? queryAll?.data?.data?.results || []
        : queryUs?.data?.data?.results || [];

    if (isChecked) {
      return data?.filter((contact) => contact?.id % 2 === 0);
    }

    return data;
  };



  const handleScroll = () => {
    const container = containerRef.current;

    if (
      container.scrollHeight - container.scrollTop ===
      container.clientHeight
    ) {
      // User has scrolled to the bottom
      setCurrentPage((prev) => prev + 1);
    }
    if (container.scrollTop === 0) {
      // User has scrolled to the bottom
      setCurrentPage((prev) => Math.max(1, prev - 1));
    }
  };

  useEffect(() => {
    const container = containerRef.current;

    if (container) container.addEventListener("scroll", handleScroll);

    return () => {
      if (container) container.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#modalA"
            onClick={() => showModal("Modal A")}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={() => showModal("Modal B")}
          >
            US Contacts
          </button>
        </div>
      </div>

      <div>
        {/* Modal A & B*/}
        <Modal
          show={show}
          onHide={hideModal}
          backdrop="static"
          keyboard={false}
          dialogClassName="modal-dialog-centered"
        >
          <Modal.Header closeButton>
            <Modal.Title>{modal}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex gap-2 py-2">
              <div className="flex-item">
                <Button
                  variant="primary"
                  style={{
                    background: "#46139f",
                  }}
                  onClick={() => {
                    showModal("Modal A");
                    navigate(`${location?.pathname}?modal=modal-a`);
                  }}
                >
                  All Contacts
                </Button>
              </div>
              <div className="flex-item">
                <Button
                  variant="warning"
                  style={{
                    background: "#ff7f50",
                  }}
                  onClick={() => {
                    showModal("Modal B");
                    navigate(`${location?.pathname}?modal=modal-b`);
                  }}
                >
                  Us Contacts
                </Button>
              </div>
              <div className="flex-item">
                <Button
                  variant="danger"
                  onClick={() => {
                    hideModal();
                    navigate(`${location?.pathname}`);
                  }}
                >
                  Close
                </Button>
              </div>
            </div>

            {/* search */}
            <Form.Label>Search</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Search by phone number"
              value={queryParams?.search}
              onChange={(e) =>
                setQueryparams((prev) => ({ ...prev, search: e.target.value }))
              }
            />
            <div
              className="py-4"
              ref={containerRef}
              style={{
                maxHeight: "600px",
                minHeight: "600px",
                overflow: "auto",
              }}
            >
              {queryAll?.isLoading && queryUs?.isLoading ? (
                <div>
                  <p>Loading...</p>
                </div>
              ) : (
                <div className="d-flex flex-column gap-2">
                  {getData().map((contact, i) => {
                    return (
                      <div
                        key={i}
                        className="py-2 px-2 border rounded"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            setContact(contact)
                            showModal("Modal C")
                        }}
                      >
                        <p>
                          <strong>Id: </strong>
                          {contact?.id}
                        </p>
                        <p>
                          <strong>Country: </strong>
                          {contact?.country?.name}
                        </p>
                        <p>
                          <strong>Phone: </strong>
                          {contact?.phone}
                        </p>
                      </div>
                    );
                  })}

                  {getData().length <= 0 && <p>No data found</p>}
                </div>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-start">
            <FormCheck
              label="Only Event"
              checked={isChecked}
              onChange={() => setIsChecked((prev) => !prev)}
            />
          </Modal.Footer>
        </Modal>

        {/* Modal  C*/}

        <Modal
          show={showC}
          onHide={hideModal}
          backdrop="static"
          keyboard={false}
          dialogClassName="modal-dialog-centered"
        >
          <Modal.Header closeButton>
            <Modal.Title>{"Modal C"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex gap-2 py-2">
              <div className="flex-item">
                <Button
                  variant="primary"
                  style={{
                    background: "#46139f",
                  }}
                  onClick={() => {
                    showModal("Modal A");
                    navigate(`${location?.pathname}?modal=modal-a`);
                  }}
                >
                  All Contacts
                </Button>
              </div>
              <div className="flex-item">
                <Button
                  variant="warning"
                  style={{
                    background: "#ff7f50",
                  }}
                  onClick={() => {
                    showModal("Modal B");
                    navigate(`${location?.pathname}?modal=modal-b`);
                  }}
                >
                  Us Contacts
                </Button>
              </div>
              <div className="flex-item">
                <Button
                  variant="danger"
                  onClick={() => {
                    hideModal();
                    navigate(`${location?.pathname}`);
                  }}
                >
                  Close
                </Button>
              </div>
            </div>

            <div
              className="py-4"
              ref={containerRef}
              style={{
                maxHeight: "600px",
                minHeight: "600px",
                overflow: "auto",
              }}
            >
              <div
                className="py-2 px-2 border rounded"
                style={{ cursor: "pointer" }}
                
              >
                <p>
                  <strong>Id: </strong>
                  {contact?.id}
                </p>
                <p>
                  <strong>Country: </strong>
                  {contact?.country?.name}
                </p>
                <p>
                  <strong>Phone: </strong>
                  {contact?.phone}

                </p>
              </div>
            </div>
          </Modal.Body>
       
        </Modal>
      </div>
    </div>
  );
};

export default Problem2;
