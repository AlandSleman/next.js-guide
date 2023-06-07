import React from "react";
import TreeView, { flattenTree } from "react-accessible-treeview";
import { ITreeViewProps } from "react-accessible-treeview";
import { DiCss3, DiJavascript, DiNpm } from "react-icons/di";
import { SiReact, SiTypescript } from "react-icons/si"
import { FaList, FaRegFolder, FaRegFolderOpen } from "react-icons/fa";


export default function TreeRenderer({ folder, defaultExpanded }: { folder: any, defaultExpanded?: number[] }) {
  const data = flattenTree(folder);
  return (
    <div>
      <div className="ide">
        <TreeView
          data={data}
          aria-label="directory tree"
          togglableSelect
          clickAction="EXCLUSIVE_SELECT"
          defaultExpandedIds={defaultExpanded}
          multiSelect
          nodeRenderer={({
            element,
            isBranch,
            isExpanded,
            getNodeProps,
            level,
            handleSelect,
          }) => (
            <div {...getNodeProps()} style={{ paddingLeft: 20 * (level - 1) }}>
              {isBranch ? (
                <FolderIcon isOpen={isExpanded} />
              ) : (
                <FileIcon filename={element.name} />
              )}
              {element.name}
              {/* -{element.id} */}
            </div>
          )}
        />
      </div>
    </div>
  );
}

const FolderIcon = ({ isOpen }) =>
  isOpen ? (
    <FaRegFolderOpen color="e8a87c" />
  ) : (
    <FaRegFolder color="e8a87c" />
  );

const FileIcon = ({ filename }: { filename: string }) => {
  let extension = "";

  if (filename.includes(".")) {
    extension = filename.slice(filename.lastIndexOf(".") + 1);
  }

  switch (extension) {
    case "jsx":
    case "tsx":
      return <SiReact color="#5FD3F2" />;
    case "ts":
      return <SiTypescript color="#3174C1" />;
    case "js":
      return <DiJavascript color="yellow" />;
    case "css":
      return <DiCss3 color="#3590CB" />;
    default:
      return null;
  }
};


