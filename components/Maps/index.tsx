export default function Map() {
  return (
    <>
      <div id="footer" className="flex items-center justify-center py-8 ">
        <div className="mapouter">
          <div className="gmap_canvas">
            <iframe
              src="https://maps.google.com/maps?q=40.495216,68.763196&ll=40.495216,68.763196&z=16&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
              style={{ width: 790, height: 500 }}
            ></iframe>
            <style>
              {`
      .mapouter{position:relative;height:400px;min-width:375px;background:#fff;}
      `}
            </style>

            <style>{`.gmap_canvas{overflow:hidden;height:400px;min-width:375px}.gmap_canvas iframe{position:relative;z-index:2}`}</style>
          </div>
        </div>
      </div>
    </>
  );
}
