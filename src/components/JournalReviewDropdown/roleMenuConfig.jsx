import { Archive, Edit, Eye, Flag, Share, Trash2, UserPlus, FileText, ClipboardCheck } from "lucide-react";

export const roleMenuConfigs = {
  admin: [
    {
      id: 'view-details',
      label: 'View Details',
      icon: Eye,
      type: 'link',
      url: (manuscript) => `${manuscript.intro_id}`
    },
    {
      id: 'invite-editor',
      label: 'Invite Editor',
      icon: UserPlus,
      type: 'link',
      url: (manuscript) => `assign-editor?article_id=${manuscript.intro_id}`
    },
    {
      id: 'edit-manuscript',
      label: 'Edit Manuscript',
      icon: Edit,
      type: 'link',
      url: (manuscript) => `edit-manuscript?article_id=${manuscript.intro_id}`
    },
    {
      id: 'invite-reviewer',
      label: 'Invite Reviewer',
      icon: UserPlus,
      type: 'link',
      url: (manuscript) => `assign-reviewer?article_id=${manuscript.intro_id}`
    },
    {
      id: 'editor-decision',
      label: 'Post Editor Decision',
      icon: ClipboardCheck,
      type: 'button',
      action: 'handleEditorDecision'
    },
    {
      id: 'reviewer-decision',
      label: 'Reviewer Decision',
      icon: ClipboardCheck,
      type: 'button',
      action: 'handleReviewerDecision'
    },
    {
      id: 'share',
      label: 'Share',
      icon: Share,
      type: 'button',
      action: 'handleShare'
    },
    {
      id: 'archive',
      label: 'Archive',
      icon: Archive,
      type: 'button',
      action: 'handleArchive'
    },
    {
      id: 'flag',
      label: 'Flag for Review',
      icon: Flag,
      type: 'button',
      action: 'handleFlag'
    },
    {
      id: 'separator',
      type: 'separator'
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: Trash2,
      type: 'button',
      action: 'handleDelete',
      className: 'text-red-600 hover:bg-red-50'
    }
  ],
  
  editor: [
    {
      id: 'view-details',
      label: 'View Details',
      icon: Eye,
      type: 'button',
      action: 'handleViewDetails'
    },
    {
      id: 'edit-manuscript',
      label: 'Edit Manuscript',
      icon: Edit,
      type: 'link',
      url: (manuscript) => `edit-manuscript?article_id=${manuscript.intro_id}`
    },
    {
      id: 'invite-reviewer',
      label: 'Invite Reviewer',
      icon: UserPlus,
      type: 'link',
      url: (manuscript) => `assign-reviewer?article_id=${manuscript.intro_id}`
    },
    {
      id: 'editor-decision',
      label: 'Post Editor Decision',
      icon: ClipboardCheck,
      type: 'button',
      action: 'handleEditorDecision'
    },
    {
      id: 'share',
      label: 'Share',
      icon: Share,
      type: 'button',
      action: 'handleShare'
    },
    {
      id: 'flag',
      label: 'Flag for Review',
      icon: Flag,
      type: 'button',
      action: 'handleFlag'
    }
  ],
  
  reviewer: [
    {
      id: 'view-details',
      label: 'View Details',
      icon: Eye,
      type: 'button',
      action: 'handleViewDetails'
    },
    {
      id: 'reviewer-decision',
      label: 'Submit Review',
      icon: ClipboardCheck,
      type: 'button',
      action: 'handleReviewerDecision'
    },
    {
      id: 'share',
      label: 'Share',
      icon: Share,
      type: 'button',
      action: 'handleShare'
    }
  ],
  
  author: [
    {
      id: 'view-details',
      label: 'View Details',
      icon: Eye,
      type: 'button',
      action: 'handleViewDetails'
    },
    {
      id: 'edit-manuscript',
      label: 'Edit Manuscript',
      icon: Edit,
      type: 'link',
      url: (manuscript) => `edit-manuscript?article_id=${manuscript.intro_id}`
    },
    {
      id: 'share',
      label: 'Share',
      icon: Share,
      type: 'button',
      action: 'handleShare'
    }
  ],
  
};