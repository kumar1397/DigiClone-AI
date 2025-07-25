export default function LoaderCard() {
  return (
    <div className="w-[335px] bg-white relative mx-auto box-border">
      <div className="w-full h-[243px] bg-[#FAFAFA] p-4 box-border">
        <div className="w-[271px] h-4 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse mb-4" />
        <svg
          className="mx-auto mt-[25%]"
          width="84px"
          height="63px"
          viewBox="0 0 84 63"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fillRule="evenodd" fillOpacity="0.06">
            <g transform="translate(-964, -1012)" fill="#000">
              <g transform="translate(836, 909)">
                <g transform="translate(100, 67)">
                  <path d="M108.368088,36.5625 L30.8485565,36.5625 C29.319526,36.5625 28.0800018,37.8216991 28.0800018,39.375 L28.0800018,95.625 C28.0800018,97.1783009 29.319526,98.4375 30.8485565,98.4375 L108.368088,98.4375 C109.897118,98.4375 111.136642,97.1783009 111.136642,95.625 L111.136642,39.375 C111.136642,37.8216991 109.897118,36.5625 108.368088,36.5625 Z M105.599533,42.1875 L105.599533,81.225 L96.7678436,68.68125 C96.2965986,68.0076728 95.5575991,67.5787153 94.747102,67.5082962 C93.936605,67.4378771 93.1366348,67.7331229 92.5596405,68.315625 L82.0668182,79.003125 L59.1154999,55.6875 C58.0356599,54.5970274 56.2916778,54.5970274 55.2118378,55.6875 L33.6171112,77.596875 L33.6171112,42.1875 L105.599533,42.1875 Z M33.6171112,92.8125 L33.6171112,85.528125 L57.149826,61.621875 L80.1011444,84.9375 C81.1809844,86.0279726 82.9249665,86.0279726 84.0048065,84.9375 L94.1654022,74.64375 L105.599533,90.9 L105.599533,92.8125 Z M77.9139862,56.25 C77.9139862,53.1433983 80.3930345,50.625 83.4510956,50.625 C86.5091566,50.625 88.988205,53.1433983 88.988205,56.25 C88.988205,59.3566017 86.5091566,61.875 83.4510956,61.875 C80.3930345,61.875 77.9139862,59.3566017 77.9139862,56.25 Z"/>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>
      <div className="p-4 bg-white">
        <div className="w-[78px] h-2 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse mb-2" />
        <div className="w-[131px] h-2 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse mb-4" />
        <div className="w-7 h-7 rounded-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 float-right animate-pulse" />
        <div className="clear-both" />
      </div>
    </div>
  );
}
