import { useState, CSSProperties } from "react";
import {
    ClipLoader,
    BarLoader,
    BeatLoader,
    BounceLoader,
    CircleLoader,
    ClimbingBoxLoader,
    ClockLoader,
    DotLoader,
    FadeLoader,
    GridLoader,
    HashLoader,
    MoonLoader,
    PacmanLoader,
    PropagateLoader,
    PuffLoader,
    PulseLoader,
    RingLoader,
    RiseLoader,
    RotateLoader,
    ScaleLoader,
    SyncLoader
} from "react-spinners";
// import BarLoader from "react-spinners/BarLoader";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

function Spinner() {
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ffffff");

    return (
        <div className="sweet-loading">
            <button onClick={() => setLoading(!loading)}>Toggle Loader</button>
            <input value={color} onChange={(input) => setColor(input.target.value)} placeholder="Color of the loader" />
            <div style={{ 'border': "2px solid white" }}>
                <h1 style={{ 'color': "white" }}>ClipLoader</h1>
                <ClipLoader color={color} loading={loading} cssOverride={override} size={15} />
                <ClipLoader color={color} loading={loading} size={15} />
            </div>
            <div style={{ 'border': "2px solid white" }}>
                <h1 style={{ 'color': "white" }}>BarLoader</h1>
                <BarLoader color={color} loading={loading} size={15} />
            </div>
            <div style={{ 'border': "2px solid white" }}>
                <h1 style={{ 'color': "white" }}>BeatLoader</h1>
                <BeatLoader color={color} loading={loading} size={15} />
            </div>
            <div style={{ 'border': "2px solid white" }}>
                <h1 style={{ 'color': "white" }}>BounceLoader</h1>
                <BounceLoader color={color} loading={loading} size={15} />
            </div>
            <div style={{ 'border': "2px solid white" }}>
                <h1 style={{ 'color': "white" }}>CircleLoader</h1>
                <CircleLoader color={color} loading={loading} size={15} />
            </div>
            <div style={{ 'border': "2px solid white" }}>
                <h1 style={{ 'color': "white" }}>ClimbingBoxLoader</h1>
                <ClimbingBoxLoader color={color} loading={loading} size={15} />
            </div>
            <div style={{ 'border': "2px solid white" }}>
                <h1 style={{ 'color': "white" }}>ClockLoader</h1>
                <ClockLoader color={color} loading={loading} size={15} />
            </div>
            <div style={{ 'border': "2px solid white" }}>
                <h1 style={{ 'color': "white" }}>HashLoader</h1>
                <HashLoader color={color} loading={loading} size={15} />
            </div>
            <div style={{ 'border': "2px solid white" }}>
                <h1 style={{ 'color': "white" }}>GridLoader</h1>
                <GridLoader color={color} loading={loading} size={15} />
            </div>
            <div style={{ 'border': "2px solid white" }}>
                <h1 style={{ 'color': "white" }}>FadeLoader</h1>
                <FadeLoader color={color} loading={loading} size={15} />
            </div>
            <div style={{ 'border': "2px solid white" }}>
                <h1 style={{ 'color': "white" }}>DotLoader</h1>
                <DotLoader color={color} loading={loading} size={15} />
            </div>
            <div style={{ 'border': "2px solid white" }}>
                <h1 style={{ 'color': "white" }}>PuffLoader</h1>
                <PuffLoader color={color} loading={loading} size={15} />
            </div>
            <div style={{ 'border': "2px solid white" }}>
                <h1 style={{ 'color': "white" }}>PropagateLoader</h1>
                <PropagateLoader color={color} loading={loading} size={15} />
            </div>
            <div style={{ 'border': "2px solid white" }}>
                <h1 style={{ 'color': "white" }}>PacmanLoader</h1>
                <PacmanLoader color={color} loading={loading} size={15} />
            </div>
            <div style={{ 'border': "2px solid white" }}>
                <h1 style={{ 'color': "white" }}>MoonLoader</h1>
                <MoonLoader color={color} loading={loading} size={15} />
            </div>
            <div style={{ 'border': "2px solid white" }}>
                <h1 style={{ 'color': "white" }}>SyncLoader</h1>
                <SyncLoader color={color} loading={loading} size={15} />
            </div>
            <div style={{ 'border': "2px solid white" }}>
                <h1 style={{ 'color': "white" }}>ScaleLoader</h1>
                <ScaleLoader color={color} loading={loading} size={15} />
            </div>
            <div style={{ 'border': "2px solid white" }}>
                <h1 style={{ 'color': "white" }}>RotateLoader</h1>
                <RotateLoader color={color} loading={loading} size={15} />
            </div>
            <div style={{ 'border': "2px solid white" }}>
                <h1 style={{ 'color': "white" }}>RiseLoader</h1>
                <RiseLoader color={color} loading={loading} size={15} />
            </div>
            <div style={{ 'border': "2px solid white" }}>
                <h1 style={{ 'color': "white" }}>RingLoader</h1>
                <RingLoader color={color} loading={loading} size={15} />
            </div>
            <div style={{ 'border': "2px solid white" }}>
                <h1 style={{ 'color': "white" }}>PulseLoader</h1>
                <PulseLoader color={color} loading={loading} size={15} />
            </div>

        </div>
    );
}

export default Spinner;