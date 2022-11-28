import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { characteristPokemon, pokemonById } from "../../utils/queryAPI/pokemon";
import { Col, Container, Row, ListGroup, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./pokeData.css";

const PokeData = () => {
  const TYPE_LANGUAGE = "es";
  const { id } = useParams();
  const [pokemonData, setPokemonData] = useState("");
  const [descriptions, setDescriptions] = useState("");

  useEffect(() => {
    const consultaPokemonById = async () => {
      const data = await pokemonById(id);
      setPokemonData(data);
    };
    consultaPokemonById();
  }, [id]);

  useEffect(() => {
    const caractisticasByPokemon = async () => {
      const data = await characteristPokemon(id);
      const { descriptions } = data;
      const dataFilter = descriptions.filter(
        (desc) => desc.language.name === TYPE_LANGUAGE
      );

      setDescriptions(dataFilter);
    };
    caractisticasByPokemon();
  }, [id]);

  return (
    <Container>
      {pokemonData === "" ? (
        <div className="text-center pt-5">
          <h1>No se encontro la informacion solicitada</h1>
        </div>
      ) : (
        <>
          <Row className="py-5">
            <Col xs={12} sm={8}>
              <h1>
                Informacion de:{" "}
                {pokemonData?.name[0].toUpperCase() +
                  pokemonData?.name.slice(1)}
              </h1>
            </Col>
            <Col className='aa' xs={12} sm={4}>
              <Link
                to={'/'}
                className="btn btn-primary"
                variant="info"
              >
                Volver
              </Link>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={12} md={8}>
              <ListGroup>
                <ListGroup.Item>
                  <span className="fw-bolder">Nombre:</span>{" "}
                  <span>{pokemonData?.name}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="fw-bolder">Descipcion:</span>{" "}
                  <span>{descriptions[0].description}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="fw-bolder">Lista de Movimientos</span>
                  <ListGroup className="px-3 py-2" as="ol" numbered>
                    {pokemonData.moves?.map(({ move }, i) => (
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
            <Col xs={12} md={4} className="columHidden">
              <div>
                <Image
                  className="w-100"
                  src={
                    pokemonData?.sprites?.other["official-artwork"]
                      .front_default
                  }
                />
              </div>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default PokeData;
