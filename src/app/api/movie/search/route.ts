import { connect } from "@/db/dbConfig";
import Movie from "@/db/models/movieModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
    const queryParam = request.nextUrl.searchParams.get('movie');
    try {
        const results = await Movie.aggregate(
            [
                {
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
                },
                {
                    $limit: 10
                },
                {
                    $project: {
                        id: 1,
                        title: 1,
                    }
                }
              ]
        )
        //console.log(results)
        if(!results) {
            return NextResponse.json({message: "No movies found"}, {status: 404});
        }

        return NextResponse.json({results}, {status: 200});
    }
    catch(error: any) {
        return NextResponse.json({error: "Sorry! " + error}, {status: 500});
    }
}