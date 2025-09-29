import { Console, Effect, pipe } from 'effect'
import { Args, Command, Options } from '@effect/cli'
import { FileSystem, Path } from '@effect/platform'
import { NodeContext, NodeRuntime } from '@effect/platform-node'

import { Command as PlatformCommand } from '@effect/platform'

const slidesFilesArg = Args.file({ name: 'slides' }).pipe(Args.repeated)
const baseUrlOption = Options.text("base").pipe(Options.withAlias('b'))

const mainCommand = Command.make('run', { slidesFilesArg, baseUrlOption }, ({ baseUrlOption, slidesFilesArg }) => pipe(
    Effect.all([FileSystem.FileSystem, Path.Path]),
    Effect.flatMap(([fs, path]) =>
        Effect.forEach(slidesFilesArg, (slidesPath) => {
            const filename = path.basename(slidesPath, path.extname(slidesPath))
            const outDir = path.join("dist", filename)
            const baseUrl = `${baseUrlOption}/${filename}/index.html`

            const command = PlatformCommand.make(
                `slidev build`,
                slidesPath,
                `--out`,
                outDir,
                `--base`,
                baseUrl
            ).pipe(PlatformCommand.runInShell(true))

            return pipe(
                fs.exists(slidesPath),
                Effect.flatMap((exists) => Effect.if(exists, {
                    onFalse: () => Console.error(`Error while building ${filename} slides.`),
                    onTrue: () => PlatformCommand.string(command)
                }))
            )
        })
    )
))

const main = Command.run(mainCommand, {
    name: 'build',
    version: '0.0.0',
})

main(process.argv).pipe(Effect.provide(NodeContext.layer), NodeRuntime.runMain)
