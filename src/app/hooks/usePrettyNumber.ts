export function usePrettyNumber() {

    function getPrettyNumber(num: number): string {
        return num < 10 ? `0${num}` : `${num}`;
    }

    return {getPrettyNumber};
}