import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Button, Card, Carousel, CloseButton, Table } from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai";
import { GrAdd } from "react-icons/gr";
import styled from "styled-components";

function ImageSelect({ tempPhong, setShowImageSelect }) {
  const [hinhAnhMoi, setHinhAnhMoi] = useState([]);
  const inputFile = useRef(null);
  useEffect(() => {
    setHinhAnhMoi(tempPhong.hinhAnhPhong);
  }, [tempPhong]);

  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };
  const handleFileUpload = (e) => {
    const { files } = e.target;
    if (files && files.length) {
    }
  };
  return (
    <StyledContainer>
      <div className="container-styled">
        <div className="header">
          <h2 className="header-title">Chọn hình {tempPhong.tenPhong}</h2>
          <CloseButton onClick={() => setShowImageSelect(undefined)} />
        </div>
        <div className="content-container">
          <div className="images">
            <Carousel slide={true}>
              {hinhAnhMoi &&
                hinhAnhMoi.length > 0 &&
                hinhAnhMoi.map((img, index) => {
                  return (
                    <Carousel.Item>
                      <img
                        key={index}
                        className="d-block w-100"
                        src={img}
                        alt={`Hình ${index}`}
                      />
                    </Carousel.Item>
                  );
                })}
            </Carousel>
          </div>
          <div className="image-added">
            {!hinhAnhMoi || hinhAnhMoi.length === 0 ? (
              <p>Chưa chọn phòng</p>
            ) : (
              <div className="list-image-selected">
                <Card>
                  <Card.Header>Danh sách phòng</Card.Header>
                  <Card.Body>
                    <div className="list-image">
                      {hinhAnhMoi.map((img, index) => {
                        return (
                          <div className="image-item">
                            <AiFillCloseCircle
                              style={{
                                color: "red",
                                fontSize: "2rem",
                                cursor: "pointer",
                                position: "absolute",
                                top: 0,
                                right: 0,
                              }}
                            />
                            <img
                              key={index}
                              className="d-block w-100"
                              src={img}
                              alt={`Hình ${index}`}
                            />
                          </div>
                        );
                      })}
                      <div className="add-image-btn">
                        <input
                          type="file"
                          id="file"
                          accept="image/png, image/jpeg"
                          ref={inputFile}
                          multiple={true}
                          onChange={handleFileUpload}
                          style={{ display: "none" }}
                        />
                        <button onClick={onButtonClick}>
                          <GrAdd />
                        </button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            )}
          </div>
        </div>
        <div className="btn-container">
          {hinhAnhMoi.length > 0 ? (
            <Button variant="primary" type="submit" onClick={() => {}}>
              Chọn {hinhAnhMoi.length}
            </Button>
          ) : (
            <Button variant="secondary" type="submit">
              Chọn {hinhAnhMoi.length}
            </Button>
          )}
        </div>
      </div>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow-y: scroll;
  position: absolute;
  top: 0;
  left: 0;
  /* z-index: 1; */
  display: flex;
  align-items: center;
  justify-content: center;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-image: linear-gradient(#373b44, #1095c1);
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  .container-styled {
    width: 50%;
    padding: 0.5rem;
    height: 90%;
    display: flex;
    flex-direction: column;
    text-align: start;
    background-color: #fff;
    position: relative;
    .header {
      display: flex;
      height: 10%;
      justify-content: space-between;
      .header-title {
      }
    }
    .content-container {
      width: 100%;
      height: 83%;
      overflow: scroll;
      display: flex;
      flex-direction: column;
      &::-webkit-scrollbar {
        width: 1px;
        &-thumb {
          background-image: linear-gradient(#373b44, #1095c1);
          width: 1px;
          border-radius: 1rem;
        }
      }
      .images {
        width: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        img {
          width: 100%;
          height: 300px;
          max-height: 100%;
          min-width: 100%;
          object-fit: contain;
          vertical-align: bottom;
        }
      }
      .image-added {
        margin-top: 0.5rem;
        .list-image-selected {
          .list-image {
            display: flex;
            gap: 0.5rem;
            .image-item {
              position: relative;
              img {
                width: 30%;
                height: 100px;
                max-height: 100%;
                min-width: 100%;
                object-fit: contain;
                vertical-align: bottom;
              }
            }
            .add-image-btn {
              display: flex;
              width: 100px;
              align-items: center;
              justify-content: center;
              border-style: dashed;
              button {
                background-color: transparent;
                outline: none;
                border: none;
                svg {
                  font-size: 2.5rem;
                }
              }
            }
          }
        }
      }
      tbody {
        .row-selected {
          td {
            background-color: #9fbce7d1 !important;
          }
        }
      }
    }
    .btn-container {
      display: flex;
      justify-content: flex-end;
      height: 7%;
    }
  }
  .text-red {
    font-weight: bold;
    color: red !important;
  }
  .text-green {
    font-weight: bold;
    color: green !important;
  }
`;

export default ImageSelect;
