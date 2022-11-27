import React, { useEffect, useState } from "react";
import { Col, Container, Row, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { pokemonById } from "../../utils/queryAPI/pokemon";

const PokeData = () => {
  const { id } = useParams();
  const [pokemonData, setPokemonData] = useState("");
  
  useEffect(() => {
    consultaPokemonById();
  }, []);

  const consultaPokemonById = async () => {
    const data = await pokemonById(id);
    setPokemonData(data);
  };
  return (
    <Container>
      {pokemonData === "" ? (
        <div className='text-center pt-5'>
        <h1>No se encontro la informacion solicitada</h1>
      </div>
      ) : (
        <>
          <Row className="py-5">
            <Col>
              <h1 className="text-center">
                Informacion de:{" "}
                {pokemonData?.name[0].toUpperCase() +
                  pokemonData?.name.slice(1)}
              </h1>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={12} md={6}>
              <ListGroup>
                <ListGroup.Item>
                  <span className='fw-bolder'>Nombre:</span> <span>{pokemonData?.name}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className='fw-bolder'>Lista de Movimientos</span>
                  <ListGroup className='px-3 py-2' as="ol" numbered>
                    {pokemonData.moves?.map(({move}, i) => (
                    <ListGroup.Item
                      as="li"
                      key={i}
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="">{move.name}</div>
                      </div>
                    </ListGroup.Item>
                    ))}
                  </ListGroup>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default PokeData;
