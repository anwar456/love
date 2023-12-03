import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useTypewriter, Cursor } from "react-simple-typewriter";

export default function Welcome() {
  const [isWelcomeVisible, setWelcomeVisible] = useState(true);

  const [text] = useTypewriter({
    words: [
      ` "In your smile, a love story unfolds. Our photo gallery,
    an unspoken tale, felt together always. 💖"`,
    ],
    loop: {},
  });

  const handleButtonClick = () => {
    setWelcomeVisible(false);
    const now = new Date();
    const expirationDate = new Date(now);
    expirationDate.setDate(now.getDate() + 1);
    localStorage.setItem("welcomeStatus", "hidden");
    localStorage.setItem("welcomeExpiration", expirationDate);
  };

  useEffect(() => {
    const welcomeStatus = localStorage.getItem("welcomeStatus");
    const expirationDate = new Date(localStorage.getItem("welcomeExpiration"));
    if (welcomeStatus === "hidden" && new Date() < expirationDate) {
      setWelcomeVisible(false);
    }
  }, []);

  return (
    <>
      <div className={`welcome ${isWelcomeVisible ? "" : "hidden"}`}>
        <Container className="d-flex justify-content-center align-items-center h-100">
          <div className="text-center">
            <div className="mb-3">
              <h4>Our Gallery</h4>
              <div className="box-text">
                <i>
                  {text}
                  <Cursor />
                </i>
              </div>
            </div>
            <Button
              className="py-3 px-5 mt-4"
              variant="primary"
              size="lg"
              onClick={handleButtonClick}
            >
              Open
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
}
