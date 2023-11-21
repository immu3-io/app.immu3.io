<script setup lang="ts">
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';

type ShapeType = 'straight' | 'rounded' | 'curved';
type SizeType = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

const props = withDefaults(
  defineProps<{
    /**
     * Whether the modal is open.
     */
    open?: boolean;

    /**
     * The size of the modal.
     */
    size?: SizeType;

    /**
     * The shape of the modal.
     */
    shape?: ShapeType;

    /**
     * The alignment of the footer content.
     */
    footerAlign?: 'start' | 'end' | 'center' | 'between';

    classes?: {
      wrapper?: string | string[];
      dialog?: string | string[];
    };
  }>(),
  {
    size: 'md',
    shape: 'rounded',
    footerAlign: 'end',
    classes: () => ({
      wrapper: '',
      dialog: '',
    }),
  },
);

const emit = defineEmits(['close']);

const shapeClasses: Record<ShapeType, string> = {
  straight: '',
  rounded: 'rounded-lg',
  curved: 'rounded-xl',
};

const sizeClasses: Record<SizeType, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-xl',
  xl: 'max-w-2xl',
  '2xl': 'max-w-3xl',
  '3xl': 'max-w-5xl',
};

const dialogClasses = computed(() => {
  const classes = [];

  if (props.classes.dialog) {
    if (Array.isArray(props.classes.dialog)) {
      classes.push(...props.classes.dialog);
    } else {
      classes.push(props.classes.dialog);
    }
  }

  if (props.shape && shapeClasses[props.shape]) {
    classes.push(shapeClasses[props.shape]);
  }
  if (props.size && sizeClasses[props.size]) {
    classes.push(sizeClasses[props.size]);
  }

  return classes;
});
</script>

<template>
  <TransitionRoot appear :show="props.open" as="template">
    <div class="fixed inset-0 z-[9999] flex items-center justify-center">
      <Dialog class="relative z-[60]" as="div" @close="emit('close')">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-muted-800/70 dark:bg-muted-900/80"></div>
        </TransitionChild>

        <div class="fixed inset-0">
          <div class="flex min-h-full items-center justify-center p-4 text-center" :class="props.classes.wrapper">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full bg-white text-left align-middle shadow-xl transition-all dark:bg-muted-800"
                :class="dialogClasses"
              >
                <slot name="header"></slot>

                <slot></slot>

                <div
                  v-if="'footer' in $slots"
                  class="flex w-full items-center gap-x-2"
                  :class="[
                    props.footerAlign === 'center' && 'justify-center',
                    props.footerAlign === 'end' && 'justify-end',
                    props.footerAlign === 'between' && 'justify-between',
                  ]"
                >
                  <slot name="footer"></slot>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </div>
  </TransitionRoot>
</template>
