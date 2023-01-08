import { useEffect, useRef, useState } from "react";
import "./App.css";
import legoHead from "./assets/lego-head.png";
import {ReactComponent as LegoMan} from './assets/lego-man.svg';
import legoEye from "./assets/lego-eyeball.png";
import footer from "./assets/footer.png";

function angle(cx, cy, ex, ey) {
    const dy = ey - cy;
    const dx = ex - cx;
    const rad = Math.atan2(dy, dx);
    const deg = (rad * 180) / Math.PI;
    return deg;
}

function App() {
    const legoRef = useRef(null);
	const legoProximtyRef = useRef(null)

    const [angleDeg, setAngleDeg] = useState(0);
	const [nameError, setNameError] = useState("sad");
	const [wobble, setWobble] = useState(false);
    
    const animateHead = () => {
		if(wobble) return;
        setWobble(true);
        // Buttons stops to shake after 2 seconds
        setTimeout(() => setWobble(false), 2000);
    }

	const lookAt = (target) => {
		const rect = legoRef.current.getBoundingClientRect();
		const targetRect = target.getBoundingClientRect();
        const targetX = targetRect.left + targetRect.width / 2;
        const targetY = targetRect.top + targetRect.height / 2 ;
        const anchorX = rect.left + rect.width / 2;
        const anchorY = rect.top + rect.height / 2 ;
		setAngleDeg(angle(targetX, targetY, anchorX, anchorY));
	}

    useEffect(() => {
        const handleMouseMove = (event) => {
            const rect = legoRef.current.getBoundingClientRect();
            const anchorX = rect.left + rect.width / 2;
            const anchorY = rect.top + rect.height / 2 ;
            setAngleDeg(angle(event.clientX, event.clientY, anchorX, anchorY));
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div className="App">
            {/* {loading && <LegoPreloader />} */}
            <div className="header unselectable">
                <h1>LE DÉBUT</h1>
                <h4>un poco loco</h4>
            </div>
            <div className="main-wrapper">
				<div className="form-wrapper">
					<div className="lego-character-proximity" onClick={animateHead}></div>
					<div className={(wobble?"lego-character wobble unselectable":"lego-character")}>
						<img
							ref={legoRef}
							src={legoHead}
							width={96}
							alt=""
							id="head"
						/>
						<div id="eyes">
							<img
								src={legoEye}
								alt=""
								style={{
									top: -54,
									left: 24.5,
									borderRadius: "50%",
									transform: `rotate(${90 + angleDeg}deg)`,
								}}
								className="eye"
							/>
							<img
								src={legoEye}
								alt=""
								style={{
									top: -54,
									left: 49.5,
									borderRadius: "50%",
									transform: `rotate(${90 + angleDeg}deg)`,
								}}
								className="eye"
							/>
						</div>
					</div>
					<form action="" className="form">
						<h1 className="unselectable">un poco loco</h1>
						<div className="image-container">
							<div className="input-container">
								<div className="inputfield">
									<h2>Enter Your Name<span>*</span></h2>
									<input onFocus={(e)=>{lookAt(e.target)}} type="text" style={nameError&&{border: "2px solid #FF002A"}} />
									<p>{nameError?nameError:" "}</p>
								</div>
								<div className="inputfield">
									<h2>Enter Your Email<span>*</span></h2>
									<input onFocus={(e)=>{lookAt(e.target)}} type="text" style={nameError&&{border: "2px solid #FF002A"}} />
									<p>{nameError?nameError:" "}</p>
								</div>
								<div className="inputfield">
									<h2>Enter Your Name<span>*</span></h2>
									<input onFocus={(e)=>{lookAt(e.target)}} type="text" style={nameError&&{border: "2px solid #FF002A"}} />
									<p>{nameError?nameError:" "}</p>
								</div>
							</div>
							<div className="legoman-wrapper">
								<LegoMan className="legoman" />	
							</div>
						</div>
						<div className="inputfield textarea">
							<h2>Enter Your Name<span>*</span></h2>
							<textarea onFocus={(e)=>{lookAt(e.target)}} style={nameError&&{border: "2px solid #FF002A"}} />
							<p>{nameError?nameError:" "}</p>
						</div>
						<button className="submit"><p>Submit</p><div className="circle"></div><div className="circle"></div></button>
					</form>
				</div>
            </div>
			<img className="footer" src={footer} alt="" />
        </div>
    );
}

export default App;
