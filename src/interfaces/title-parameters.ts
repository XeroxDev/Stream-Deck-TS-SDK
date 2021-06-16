export interface TitleParameters {
    fontFamily: string;
    fontSize: number;
    fontStyle: string;
    fontUnderline: boolean;
    showTitle: boolean;
    titleAlignment: 'top' | 'bottom' | 'middle';
    titleColor: string;
    // No Regex testing for hex colors in types :c And no. I will not define all possible hex
    // codes from #000 to #ffffff in lower and uppercase
}
