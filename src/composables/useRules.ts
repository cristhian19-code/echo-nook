import { ref } from "vue";

export const rules = {
  required: (value: any) => {
    if (typeof value === "string") {
      if (!value.trim() || !Boolean(value)) return "Campo Requerido"
      else true
    } else {
      if (!value || !Boolean(value)) return "Campo Requerido"
      else true
    }
  },
  email: (value: any) => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || "Email no valido";
  },
}

export const useRules = (noRequired: boolean | false, type: string, customRules: Function[]) => {
  const rulesInput = ref<any>([]);

  const initRules = () => {
    if (!noRequired) {
      rulesInput.value.push(rules.required);
    }

    if (type === "email") {
      rulesInput.value.push(rules.email);
    }
    
    if (customRules) {
      rulesInput.value.push(...customRules);
    }
  }

  return {
    rulesInput,
    initRules
  }
}