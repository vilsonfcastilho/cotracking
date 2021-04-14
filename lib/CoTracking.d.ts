import Order from './entities/Order';
declare class CoTracking {
    private verifyOrderCode;
    private formatTrack;
    track: (code: string | string[]) => Promise<Order | Order[]>;
}
export default CoTracking;
//# sourceMappingURL=CoTracking.d.ts.map