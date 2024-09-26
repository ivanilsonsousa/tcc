import { forwardRef, useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ControllerRenderProps } from "react-hook-form";
import { getDadosFormatados, reverseTransformStructure, transformStructure, updateNodeState } from "./functions";
import SkeletonNestedCheckboxList from "@/components/custom/SkeletonNestedCheckboxList";
import { IDimensionsList } from "@/types";
import api from "@/api";

interface FormValues {
  [key: string]: any;
}

interface Props {
  // data: IDimensionsList | null;
  onValueChange?: (value: IDimensionsList) => void;
};

type PropsType<TFieldName extends string> = Partial<Omit<
  ControllerRenderProps<FormValues, TFieldName>,
  'ref'
>> &
  Props;

const NestedCheckboxList = forwardRef<
  HTMLDivElement,
  PropsType<string>
> (({ value, onValueChange, onChange }, ref) => {
  const [data, setData] = useState<IDimensionsList | null>(null);
  const [baseItems, setBaseItems] = useState<{ [key: string]: boolean }>({});
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/evidences", {
          headers: {
            showLoader: false,
          }
        });
        
        const { data } = response;
        setData(data);
  
        const itemsBase = getDadosFormatados(data);
        setBaseItems(itemsBase);
      } catch (err) {
        setData(null);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (!value) return;

    const saida = reverseTransformStructure(value, baseItems);
    setCheckedItems(saida);
  }, []);

  const handleUpdateNodeState = (key: string, isChecked: boolean, old: any) => {
    const itemsBase = baseItems;
    const items = { ...itemsBase, ...old };

    const updatedItems = updateNodeState(items, key, isChecked);

    return updatedItems;
  };

  const handleCheckboxChange = (key: string, isChecked: boolean) => {
    const newCheckedItems = handleUpdateNodeState(key, isChecked, checkedItems);

    setCheckedItems(newCheckedItems);
    const transformedData = transformStructure(newCheckedItems);

    onChange && onChange(transformedData);
    onValueChange && onValueChange(transformedData);
  };

  const renderList = () => {
    if (data === null) {
      return <SkeletonNestedCheckboxList />;
    }

    return Object.keys(data.dimensions).map((dimensionKey) => {
      const dimension = data.dimensions[parseInt(dimensionKey)];

      return (
        <div key={dimensionKey} ref={ref} >
          <div className="flex items-center">
            <label
              key={dimensionKey}
              htmlFor={dimensionKey}
              className="flex items-center"
            >
              <Checkbox
                id={dimensionKey}
                checked={checkedItems[dimensionKey] || false}
                onCheckedChange={(isChecked: boolean) =>
                  handleCheckboxChange(dimensionKey, isChecked)
                }
              />
              <span className="select-none ml-2">{dimension.title}</span>
            </label>
          </div>
          <div className="ml-4">
            {Object.keys(dimension.evidences).map((evidenceKey) => {
              const evidence = dimension.evidences[parseInt(evidenceKey)];
              const evidenceFullKey = `${dimensionKey}-${evidenceKey}`;

              return (
                <div key={evidenceFullKey}>
                  <div className="flex items-center my-1">
                    <label
                      htmlFor={evidenceFullKey}
                      className="flex items-center"
                    >
                      <Checkbox
                        id={evidenceFullKey}
                        checked={checkedItems[evidenceFullKey] || false}
                        onCheckedChange={(isChecked: boolean) =>
                          handleCheckboxChange(evidenceFullKey, isChecked)
                        }
                      />
                      <span className="select-none ml-2">{evidence.title}</span>
                    </label>
                  </div>
                  <div className="ml-4">
                    {Object.keys(evidence.clues).map((clueKey) => {
                      const clue = evidence.clues[Number(clueKey)];
                      const clueFullKey = `${dimensionKey}-${evidenceKey}-${clueKey}`;

                      return (
                        <div
                          key={clueFullKey}
                          className="flex items-center my-1"
                        >
                          <label
                            htmlFor={clueFullKey}
                            className="flex items-center"
                          >
                            <Checkbox
                              id={clueFullKey}
                              checked={checkedItems[clueFullKey] || false}
                              onCheckedChange={(isChecked: boolean) =>
                                handleCheckboxChange(clueFullKey, isChecked)
                              }
                            />
                            <span className="select-none ml-2">
                              {clue.title}
                            </span>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };

  return <div>{renderList()}</div>;
});

export default NestedCheckboxList;
