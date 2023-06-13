import {createRounds} from "@/src/redux/slices/rounds.state";
import {CustomTextInput} from "../components";
import CustomInputObjectWithDeleteButton from "./CustomInputObjectWithDeleteButton";
import {Formik, Form, FieldArray} from "formik";
import * as Yup from "yup";
import React from "react";
import {useDispatch} from "react-redux";

interface Team {
    name: string;
    id: number;
    onClick: () => void;
}
interface ITournamentProps {
    teams: Team[];
    tournamentName: string;
}

const NAME_ROUNDS: Record<number, string[]> = {
    7: [
        "64vos de Final",
        "32vos de Final",
        "16vos de Final",
        "8vos de final",
        "4tos de final",
        "Semifinal",
        "Final",
    ],
    6: [
        "32vos de Final",
        "16vos de Final",
        "8vos de final",
        "4tos de final",
        "Semifinal",
        "Final",
    ],
    5: [
        "16vos de Final",
        "8vos de final",
        "4tos de final",
        "Semifinal",
        "Final",
    ],
    4: ["8vos de final", "4tos de final", "Semifinal", "Final"],
    3: ["4tos de final", "Semifinal", "Final"],
    2: ["Semifinal", "Final"],
    1: ["Final"],
};

export default function FormikAbstraction(): React.ReactElement {
    const dispatch = useDispatch();

    const handleSubmit = (values: ITournamentProps): void => {
        const cantTeams = values.teams.length;
        const cantRounds = Math.ceil(Math.log2(cantTeams));
        const nameRounds = NAME_ROUNDS[cantRounds];
        const randomTeams = [...values.teams].sort(() => 0.5 - Math.random());
        const teamsNextRound: Team[] = [];

        const rounds = new Array(cantRounds).fill("").map((_, roundIndex) => {
            const cantSeeds = Math.pow(2, cantRounds - roundIndex - 1);
            const seeds = new Array(cantSeeds).fill("").map((__, seedIndex) => {
                if (roundIndex === 0) {
                    if (randomTeams.length > cantSeeds - seedIndex) {
                        return {
                            id: `MATCH${seedIndex + 1}-ROUND${roundIndex}`,
                            teams: [randomTeams.pop(), randomTeams.pop()],
                        };
                    } else {
                        const teamNextRound = randomTeams.pop();
                        if (teamNextRound != null)
                            teamsNextRound.push(teamNextRound);
                        return {
                            id: `MATCH${seedIndex + 1}-ROUND${roundIndex}`,
                            teams: [teamNextRound],
                        };
                    }
                } else {
                    // Rondas intermedias
                    return {
                        id: `MATCH${seedIndex + 1}-ROUND${roundIndex}`,
                        teams: [],
                    };
                }
            });

            return {
                id: `round-${roundIndex}`,
                title: nameRounds[roundIndex],
                seeds,
            };
        });
        dispatch(createRounds(rounds));
    };
    return (
        <Formik
            initialValues={{
                tournamentName: "",
                teams: new Array(2).fill("").map((value, index) => ({
                    name: value,
                    id: index,
                })),
            }}
            validationSchema={Yup.object({
                tournamentName: Yup.string().required("Requerido"),
                teams: Yup.array(
                    Yup.object({
                        name: Yup.string()
                            .required("Requerido")
                            .min(1, "Ingrese al menos un caracter"),
                    }),
                ).min(2),
            })}
            onSubmit={values => {
                handleSubmit(values);
            }}
        >
            {({values, isValid, dirty}) => {
                const submitDisabled = !(isValid && dirty);
                return (
                    <Form
                        noValidate
                        className="bg-gray-700 text-gray-100 flex flex-col shadow-md rounded px-6 pt-6 pb-6 mb-4 gap-4 "
                    >
                        <div className="h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-cyan-400 scrollbar-track-slate-800 pr-4">
                            <CustomTextInput
                                className="bg-gray-700 text-white placeholder-gray-100 placeholder-opacity-25 mb-4 max-w-80"
                                id="tournament-name"
                                label="Nombre del torneo"
                                name="tournamentName"
                                placeholder="Torneo de amigos"
                            />

                            <FieldArray
                                name="teams"
                                render={arrayHelpers => (
                                    <div>
                                        {values.teams.map((item, index) => {
                                            return (
                                                <div
                                                    key={`teams-${index}`}
                                                    className="mb-4"
                                                >
                                                    <CustomInputObjectWithDeleteButton
                                                        className="bg-gray-700  placeholder-gray-100 text-white placeholder-opacity-25 max-w-80"
                                                        id={`teams.${index}`}
                                                        label={`Equipo ${
                                                            index + 1
                                                        }`}
                                                        name={`teams.${index}.name`}
                                                        placeholder={`Ingresa el nombre del jugador`}
                                                        type="text"
                                                        onDelete={() => {
                                                            arrayHelpers.remove(
                                                                index,
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            );
                                        })}
                                        <button
                                            className="text-main"
                                            type="button"
                                            onClick={() => {
                                                arrayHelpers.push({
                                                    name: "",
                                                    id: values.teams.length,
                                                    winner: false,
                                                });
                                            }}
                                        >
                                            + Agregar equipo
                                        </button>
                                    </div>
                                )}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className={`btn m-auto ${
                                    submitDisabled ? "opacity-50" : ""
                                }`}
                                type="submit"
                                {...(submitDisabled
                                    ? {
                                          disabled: true,
                                      }
                                    : {})}
                            >
                                Sortear
                            </button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}
