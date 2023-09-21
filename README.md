# downquark.applicationFoss.GuiTui
Create TUIs with a GUI

- run `cad` on the _client_ folder
- run `deno run --allow-read --allow-write --allow-run tui.ts` on the _shell_ folder.

```
% git submodule update --remote
```

> great reference: (database TUI)
- https://dblab.danvergara.com/
  - https://github.com/danvergara/dblab
  
  - https://github.com/red-data-tools/YouPlot (graphs on terminal)

  - https://www.nngroup.com/articles/ux-mapping-cheat-sheet (diff graph type to think about [ search for: Service Blueprinting ])


to reset
```
rm -rf <SUBMODULES_DIRECTORY> && mkdir <SUBMODULES_DIRECTORY>
rm .gitmodules
rm -rf .git/modules/*
```

to add submodule from scratch (or after a reset):
- See instructions [here](https://github.com/DownQuark-Work/downquark.ventureCore.SubatomicModules/tree/feature/generators/prng#add-submodule-and-define-the-branch-you-want-to-track)
  
  To check out once `.gitmodules` has been added
  `git clone --recursive https://github.com/DownQuark-Work/downquark.ventureCore.SubatomicModules.git`
  `git submodule add https://github.com/DownQuark-Work/downquark.ventureCore.SubatomicModules.git modules/downquark.ventureCore.SubatomicModules`