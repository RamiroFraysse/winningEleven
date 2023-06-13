/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {updateRound} from "@/src/redux/slices/rounds.state";
import {type ITeam} from "@/src/models";
import {
    Bracket as Fixture,
    Seed,
    SeedItem,
    SeedTeam,
    type IRenderSeedProps,
} from "react-brackets";
import React from "react";
import {useDispatch, useSelector} from "react-redux";

const CustomSeed = ({
    seed,
    breakpoint,
    roundIndex,
    seedIndex,
}: IRenderSeedProps) => {
    const dispatch = useDispatch();

    const handleClick = (
        roundIndex: number,
        teamIndex: number,
        seedIndex: number,
        team: ITeam,
    ): void => {
        dispatch(updateRound({roundIndex, teamIndex, seedIndex, team}));
    };

    return (
        <Seed
            key={`seedContainer-${roundIndex}-${seedIndex}`}
            mobileBreakpoint={breakpoint}
            style={{fontSize: 12}}
        >
            <SeedItem>
                <div className="flex flex-col gap-4">
                    <SeedTeam
                        key={`${roundIndex}-${seedIndex}-team1`}
                        className={`participant cursor-pointer px-4 py-2 text-black font-bold rounded hover:bg-gray-600 ${
                            seed.teams[0]?.winner
                                ? "bg-cyan-400"
                                : "bg-cyan-800"
                        }`}
                        id={`${roundIndex}-${seedIndex}-team1`}
                        onClick={() => {
                            const team = {
                                id: seed.teams[0].id,
                                name: seed.teams[0]?.name || "-",
                                winner: true,
                            };
                            handleClick(roundIndex, 0, seedIndex, team);
                        }}
                    >
                        {seed.teams[0]?.name || "-"}
                    </SeedTeam>
                    <SeedTeam
                        key={`${roundIndex}-${seedIndex}-team2`}
                        className={`participant cursor-pointer px-4 py-2 text-black font-bold rounded hover:bg-gray-600 ${
                            seed.teams[1]?.winner
                                ? "bg-cyan-400"
                                : "bg-cyan-600"
                        }`}
                        id={`${roundIndex}-${seedIndex}-team2`}
                        onClick={() => {
                            handleClick(
                                roundIndex,
                                1,
                                seedIndex,
                                seed.teams[1],
                            );
                        }}
                    >
                        {seed.teams[1]?.name || "-"}
                    </SeedTeam>
                </div>
            </SeedItem>
        </Seed>
    );
};

export default function Bracket(): React.ReactElement {
    const rounds = useSelector((state: any) => {
        return state.rounds;
    });
    console.log({rounds});

    if (rounds.length === 0) {
        return <></>;
    }

    return (
        <Fixture
            renderSeedComponent={CustomSeed}
            rounds={rounds}
            swipeableProps={{enableMouseEvents: true, animateHeight: true}}
        />
    );
}
