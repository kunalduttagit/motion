import { connect } from "@/db/dbConfig";
import Movie from "@/db/models/movieModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
    const queryParam = request.nextUrl.searchParams.get('movie');
    const proSearch = request.nextUrl.searchParams.get('pro') === 'true';
    
    try {
        let searchStage;
        
        if (proSearch) {
            // Pro search: search across title, genres, actors, and director
            searchStage = {
                $search: {
                    index: "proSearchMovies",
                    compound: {
                        should: [
                            {
                                autocomplete: {
                                    query: String(queryParam),
                                    path: "title",
                                    fuzzy: {
                                        maxEdits: 2,
                                        prefixLength: 0,
                                        maxExpansions: 50
                                    }
                                }
                            },
                            {
                                text: {
                                    query: String(queryParam),
                                    path: ["genres", "actors", "director"],
                                    fuzzy: {
                                        maxEdits: 1
                                    }
                                }
                            }
                        ]
                    }
                }
            };
        } else {
            // Regular search: only search by title
            searchStage = {
                $search: {
                    index: "searchMovie",
                    autocomplete: {
                        query: String(queryParam),
                        path: "title",
                        fuzzy: {
                            maxEdits: 2,
                            prefixLength: 0,
                            maxExpansions: 50
                        }
                    }
                }
            };
        }
        
        const results = await Movie.aggregate([
            searchStage,
            {
                $limit: 10
            },
            {
                $project: {
                    id: 1,
                    title: 1,
                }
            }
        ]);
        
        if(!results) {
            return NextResponse.json({message: "No movies found"}, {status: 404});
        }

        return NextResponse.json({results}, {status: 200});
    }
    catch(error: any) {
        return NextResponse.json({error: "Sorry! " + error}, {status: 500});
    }
}