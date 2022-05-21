import { theme } from '@styles/theme';

interface Props {
  color?: string;
}

const FolderIcon = ({ color = theme.colors.blue[500] }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="그룹_26"
      data-name="그룹 26"
      width="15.667"
      height="12.275"
      viewBox="0 0 15.667 12.275"
    >
      <defs>
        <clipPath id="clip-path">
          <rect id="사각형_29" data-name="사각형 29" width="15.667" height="12.275" fill="#6c7bfa" />
        </clipPath>
      </defs>
      <g id="그룹_25" data-name="그룹 25" transform="translate(0 0)" clipPath="url(#clip-path)">
        <path
          id="패스_35"
          data-name="패스 35"
          d="M15.667,2.425v9.441a.408.408,0,0,1-.409.409H.409A.41.41,0,0,1,0,11.866V.409A.41.41,0,0,1,.409,0H7.357a.41.41,0,0,1,.409.409v1.2a.408.408,0,0,0,.409.409h7.084a.408.408,0,0,1,.409.409"
          transform="translate(0 0)"
          fill={color}
        />
      </g>
    </svg>
  );
};

export default FolderIcon;
