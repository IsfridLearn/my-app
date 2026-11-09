import { CaseFigure } from "@/components/dabashare/CaseFigure";
import { TextList } from "@/components/ui/TextList";
import { dabashareCase } from "@/data/dabashare";

export function Process() {
  const { decisions, flow, flowText, shots, structure } = dabashareCase;

  return (
    <section className="cs-process" aria-labelledby="cs-process-title">
      <h2 id="cs-process-title" className="cs-h poster cs-pad">
        Design and process
      </h2>

      <TextList items={flow} className="cs-flow poster" ordered label="User flow" />

      <div className="grid cs-explain">
        <div className="cs-explain-a">
          <h3 className="cs-sub">User flow</h3>
          <p>{flowText}</p>
        </div>
        <div className="cs-explain-b">
          <h3 className="cs-sub">Interface structure</h3>
          <p>{structure}</p>
        </div>
      </div>

      <div className="grid cs-gallery">
        <CaseFigure shot={shots.login} className="cs-g1" sizes="(max-width: 1023px) 100vw, 58vw" />
        <div className="cs-g-note">
          <h3 className="cs-sub">Design decisions</h3>
          <TextList items={decisions} className="cs-list" />
        </div>
        <CaseFigure shot={shots.match} className="cs-g2" sizes="(max-width: 1023px) 100vw, 40vw" />
        <CaseFigure shot={shots.messages} className="cs-g3" sizes="(max-width: 1023px) 100vw, 58vw" />
        <CaseFigure shot={shots.post} className="cs-g4" sizes="(max-width: 1023px) 100vw, 34vw" />
        <CaseFigure shot={shots.webinars} className="cs-g5" sizes="(max-width: 1023px) 100vw, 46vw" />
      </div>
    </section>
  );
}
