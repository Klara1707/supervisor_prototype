
import "./HomePage.css";
import HeroBar from "../components/HeroBar";
import TabMenu from "../components/TabMenu";
import NavBar from "../components/NavBar";

function HomePage() {
    return (
        <>
        <HeroBar />
        <TabMenu />
        <NavBar />

        <section className="copyright-bar">
            <p>&copy; Klara van den Burg</p>
        </section>
        </>
    );
}

export default HomePage;

