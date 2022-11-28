import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { pokemonAPI } from "../../utils/queryAPI/pokemon";
import { Card, Row, Col, Container, Pagination } from "react-bootstrap";
import "./home.css";

const Home = () => {
  const [pokemonsData, setPokemonsData] = useState("");
  const [countPages, setCountPages] = useState(0);
  const [page, setPage] = useState(1);

  const middle = Math.ceil(countPages / 2);
  const items = [];
  let active = page;

  const handlePagination = (number) => {
    setPage(number);
  };
  const createPaginationItem = (number) => {
    return (
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => handlePagination(number)}
      >
        {number}
      </Pagination.Item>
    );
  };

  items.push(createPaginationItem(1));
  items.push(<Pagination.Ellipsis key={999999}/>);
  for (let number = middle; number <= middle + 4; number++) {
    items.push(createPaginationItem(number));
  }
  items.push(<Pagination.Ellipsis key={9999991}/>);
  items.push(createPaginationItem(countPages));

  useEffect(() => {
    const consultaPokemon = async () => {
      const data = await pokemonAPI(page);
      const { pokeData, countPages } = data;
      setPokemonsData(pokeData);
      setCountPages(Math.ceil(countPages));
    };
    consultaPokemon();
  }, [page]);
  return (
    <Container>
      {pokemonsData.length ? (
        <>
          <div className="m-0 mt-5">
            <h1 className="text-center">Listado de Pokemons</h1>
          </div>
          <Row className="rowContainer">
            {pokemonsData.map(
              ({ id, sprites, name, weight, types, abilities }) => (
                <Col key={id} xs={12} md={6} lg={4} xl={3}>
                  <Card className="my-3">
                    <Card.Img
                      variant="top"
                      src={sprites?.other["official-artwork"].front_default}
                    />
                    <Card.Body>
                      <Card.Title>{name}</Card.Title>
                      <div className="pt-2 pb-3">
                        <div>
                          <span className="fw-bolder">Peso:</span>
                          <span> {weight}</span>
                        </div>
                        <div>
                          <span className="fw-bolder">Tipo:</span>
                          {types?.map(({ slot, type }) => (
                            <ul key={slot} className="mb-1">
                              <li className="listDecoration">{type.name}</li>
                            </ul>
                          ))}
                        </div>
                        <div>
                          <span className="fw-bolder">Habilidades:</span>
                          {abilities?.map(({ slot, ability }) => (
                            <ul key={slot} className="mb-1">
                              <li className="listDecoration">{ability.name}</li>
                            </ul>
                          ))}
                        </div>
                      </div>
                      <Link
                        to={`/pokemon/${id}`}
                        className="btn btn-info w-100"
                        variant="info"
                      >
                        Ver mas
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              )
            )}
          </Row>
          <Row className="">
            <Col xs={12} className="text-center">
              <Pagination className="text-center" size="sm">
                <Pagination.Prev
                  onClick={() => handlePagination(page - 1)}
                  disabled={page === 1}
                />
                {items}
                <Pagination.Next
                  onClick={() => handlePagination(page + 1)}
                  disabled={page === countPages}
                />
              </Pagination>
            </Col>
          </Row>
        </>
      ) : (
        <div className="text-center pt-5">
          <h1>No se encontraron Pokemons</h1>
        </div>
      )}
    </Container>
  );
};

export default Home;
