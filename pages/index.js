const Home = ({ territories }) => {
}

export default Home;

export const getServerSideProps = async () => {
    const BASE_URL = process.env.BASE_URL;

    const res = await fetch(`${BASE_URL}/Territories/All`);
    const { data } = await res.json();

    const territories = data.map((t) => ({
        id: Number(t.id),
        parent: t.parent ? Number(t.parent) : null,
        name: t.name
    }));

    const territoriesReferences = territories
        .reduce((acc, curr) => ({
            ...acc,
            [curr.id]: curr
        }), {});

    let root = [];
    for (let t of territories) {
        if (!t.parent) root.push(t);
    }
    console.log(root);

    return {
        props: {
            territories,
        }
    }
}
